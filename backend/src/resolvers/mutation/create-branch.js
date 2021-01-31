import { prisma } from '@';
import { APIExceptcion } from '@/services/erros.service';
import { POSITION } from '@/utils/constants';

const createBranch = async (_, { branch }, { user, organizationId }) => {
  if (user.position !== POSITION.Admin) {
    throw new APIExceptcion('not authorized user');
  }
  return prisma.branch.create({
    data: {
      ...branch,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default createBranch;
