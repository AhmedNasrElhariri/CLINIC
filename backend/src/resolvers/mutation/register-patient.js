import { prisma } from '@';
import bcrypt from 'bcryptjs';

import { APIExceptcion } from '@/services/erros.service';

const registerPatient = async (_, { input: patientInput }) =>
  //   { userId, organizationId }
  {
    const { phoneNo, password, name, age, sex, organizationId } = patientInput;
    const patients = await prisma.patient.findMany({
      where: {
        phoneNo: {
          contains: phoneNo,
        },
      },
    });
    if (organizationId) {
      if (patients.length == 0) {
        const hashingPassword = bcrypt.hashSync(password, 10);
        const users = await prisma.user.findMany({
          where: { organizationId: organizationId },
        });
        const userOne = users[0];
        const patient = await prisma.patient.create({
          data: {
            name: name,
            age: age,
            phoneNo: phoneNo,
            sex: sex,
            password: hashingPassword,
            type: 'Primary',
            date: new Date(),
            organization: {
              connect: {
                id: organizationId,
              },
            },
            user: {
              connect: {
                id: userOne.id,
              },
            },
          },
        });
        return patient;
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
    } else {
      throw new APIExceptcion('Please Make Sure From The Link');
    }
  };

export default registerPatient;
