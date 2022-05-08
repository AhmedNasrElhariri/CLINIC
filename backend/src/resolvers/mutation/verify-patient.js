import jwt from 'jsonwebtoken';
import { APP_SECRET } from '@/utils/constants';

const verifyPatient = async (_, { token }) => {
  console.log(token, 'TTTTTTTTTTTTTTT');
  if (!token) {
    throw new Error('Please Login Agin');
    console.log(token, 'TTTTTTTTTTTTTTTINIIIIIIIIIEEEEEEEEER');
  }
  try {
    const { patientId, organizationId } = jwt.verify(token, APP_SECRET);
    console.log(patientId, 'patientId', organizationId, 'organizationId','OOOOOOOININ');
    return {
      patientId: patientId,
      organizationId: organizationId,
    };
  } catch (error) {
    console.log(token, 'TTTTTTTTTTTTTTTINIIIIIIIIIEEEEEEEEER');
    throw new Error('Please Login Agin');
  }
};

export default verifyPatient;
