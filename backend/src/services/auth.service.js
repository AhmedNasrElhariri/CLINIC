import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../utils/constants';

export const verify = async token => jwt.verify(token, APP_SECRET);

// export const getUserId = request => {
//   const Authorization = request.get('authorization');
//   if (Authorization) {
//     const token = Authorization.replace('Bearer ', '');
//     const { userId } = jwt.verify(token, APP_SECRET);
//     return userId;
//   }

//   throw new Error('Not authenticated');
// };
