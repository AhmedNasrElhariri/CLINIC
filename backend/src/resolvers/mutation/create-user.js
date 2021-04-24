import { prisma } from '@';
import bcrypt from 'bcryptjs';

import { APIExceptcion } from '@/services/erros.service';
import { POSITION } from '@/utils/constants';

const createUser = async (_, { user }, { userId, organizationId }) => {
  const currentUser = await prisma.user.findUnique({ where: { id: userId } });
  if (currentUser.position !== POSITION.Admin) {
    throw new APIExceptcion('not authorized user');
  }
  const { password, ...rest } = user;
  const hashingPassword = bcrypt.hashSync(password, 10);
  return prisma.user.create({
    data: {
      ...rest,
      password: hashingPassword,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default createUser;
