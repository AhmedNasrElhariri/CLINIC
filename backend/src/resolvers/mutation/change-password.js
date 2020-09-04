import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@';
import { APP_SECRET } from '../../utils/constants';

const changePassword = async (
  _,
  { currentPassword = '', newPassword },
  { user }
) => {
  const valid = await bcrypt.compare(currentPassword, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  await prisma.user.update({
    data: {
      password: await bcrypt.hash(newPassword, 10),
    },
    where: {
      id: user.id,
    },
  });

  const token = jwt.sign(
    { userId: user.id, organizationId: user.organizationId },
    APP_SECRET
  );

  return {
    token,
    user,
  };
};

export default changePassword;
