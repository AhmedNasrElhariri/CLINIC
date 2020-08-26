import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@';
import { APP_SECRET } from '../../utils/constants';

const login = async (_, { email = '', password }) => {
  const user = await prisma.user.findOne({
    where: { email: email.toLowerCase() },
  });
  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign(
    { userId: user.id, organizationId: user.organizationId },
    APP_SECRET
  );

  return {
    token,
    user,
  };
};

export default login;
