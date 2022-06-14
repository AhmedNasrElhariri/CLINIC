import { prisma } from '@';
import { APIExceptcion } from '@/services/erros.service';
import bcrypt from 'bcryptjs';

const forgetPatientPassword = async (_, { input: patientInput }) =>
  //   { userId, organizationId }
  {
    const { phoneNo, password } = patientInput;
    const patients = await prisma.patient.findMany({
      where: {
        phoneNo: {
          contains: phoneNo,
        },
      },
    });
    if (patients.length == 0) {
      throw new APIExceptcion('Please Register No Patient Found');
    } else {
      const patient = patients[0];

      const { id: PATIENTID } = patient;
      const hashingPassword = bcrypt.hashSync(password, 10);
      await prisma.patient.update({
        data: {
          password: hashingPassword,
        },
        where: {
          id: PATIENTID,
        },
      });
      return patient;
    }
  };

export default forgetPatientPassword;
