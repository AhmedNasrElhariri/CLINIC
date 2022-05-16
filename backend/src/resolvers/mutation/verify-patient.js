import jwt from 'jsonwebtoken';
import { APP_SECRET } from '@/utils/constants';

const verifyPatient = async (_, { token }) => {
  if (!token) {
    throw new Error('Please Login Agin');
  }
  try {
    const { patientId, organizationId } = jwt.verify(token, APP_SECRET);
    return {
      patientId: patientId,
      organizationId: organizationId,
    };
  } catch (error) {
    throw new Error('Please Login Agin');
  }
};

export default verifyPatient;
