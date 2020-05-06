import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@';
import { APP_SECRET } from '../../utils/constants';

const login = async (_, { email, password }, { response }) => {
  const user = await prisma.user.findOne({ where: { email } });
  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  response.cookie('access-token', token);

  return {
    token,
    user,
  };
};

export default login;
