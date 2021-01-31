import { prisma } from '@';
import { APIExceptcion } from '@/services/erros.service';
import { POSITION } from '@/utils/constants';

const createUser = async (_, { user: newUser }, { user, organizationId }) => {
  if (user.position !== POSITION.Admin) {
    throw new APIExceptcion('not authorized user');
  }
  return prisma.user.create({
    data: {
      ...newUser,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default createUser;
