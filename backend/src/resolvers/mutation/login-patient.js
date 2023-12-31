import { prisma } from '@';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { APIExceptcion } from '@/services/erros.service';
import { APP_SECRET } from '../../utils/constants';

const loginPatient = async (_, { input: patientInput }) => {
  const { phoneNo, password, organizationId } = patientInput;
  const patients = await prisma.patient.findMany({
    where: {
      organizationId: organizationId,
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
    if (!valid) {
      throw new APIExceptcion('Invalid password');
    }
    const { organizationId, id: PATIENTID } = patient;
    const token = jwt.sign(
      { patientId: PATIENTID, organizationId: organizationId },
      APP_SECRET
    );
    const payload = {
      token: token,
      organizationId: organizationId,
      patientId: PATIENTID,
    };
    return payload;
  }
};

export default loginPatient;
