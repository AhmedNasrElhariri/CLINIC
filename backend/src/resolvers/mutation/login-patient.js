import { prisma } from '@';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { APIExceptcion } from '@/services/erros.service';
import { APP_SECRET } from '../../utils/constants';

const loginPatient = async (_, { input: patientInput }) =>
  //   { userId, organizationId }
  {
    console.log(patientInput,'patientInputpatientInputpatientInput');
    const { phoneNo, password } = patientInput;
    const patients = await prisma.patient.findMany({
      where: {
        phoneNo: {
          contains: phoneNo,
        },
      },
    });
    if (patients.length == 0) {
      throw new APIExceptcion('No Patient Found');
    } else {
      const patient = patients[0];
      const { id, password: patientPassword } = patient;
      const valid = await bcrypt.compare(password, patientPassword);
      console.log(patient,'patient110');
      if (!valid) {
        throw new APIExceptcion('Invalid password');
      }
      const { organizationId, id: PATIENTID } = patient;
      const token = jwt.sign(
        { patientId: PATIENTID, organizationId: organizationId },
        APP_SECRET
      );
      const payload = { token: token, organizationId: organizationId };
      return payload;
    }
  };

export default loginPatient;
