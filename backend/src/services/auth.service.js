import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../utils/constants';

export const getUserPayloads = request => {
  const authorizationHeader = request.get('authorization') || '';
  const token = authorizationHeader.replace('Bearer ', '');
  const { userId, organizationId } = jwt.verify(token, APP_SECRET);
  return {
    userId: userId,
    organizationId: organizationId,
  };
};

export const verify = token => jwt.verify(token, APP_SECRET);
