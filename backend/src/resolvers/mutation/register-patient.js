import { prisma } from '@';
import bcrypt from 'bcryptjs';

import { APIExceptcion } from '@/services/erros.service';

const registerPatient = async (_, { input: patient }) =>
  //   { userId, organizationId }
  {
    const { phoneNo, password } = patient;
    const patients = await prisma.patient.findMany({
      where: {
        phoneNo: {
          contains: phoneNo,
        },
      },
    });
    if (patients.length == 0) {
      throw new APIExceptcion(
        'Please Make the first appointment from the center'
      );
    } else {
      const patient = patients[0];
      const { id } = patient;
      const hashingPassword = bcrypt.hashSync(password, 10);
      await prisma.patient.update({
        data: {
          password: hashingPassword,
        },
        where: {
          id,
        },
      });
      return patient;
    }
  };

export default registerPatient;
