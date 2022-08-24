import { prisma } from '@';
import { APIExceptcion } from '@/services/erros.service';
import { POSITION } from '@/utils/constants';

const createBranch = async (_, { branch }, { user, organizationId }) => {
  const { type } = branch;
  if (user.position !== POSITION.Admin) {
    throw new APIExceptcion('not authorized user');
  }
  if (type === 'create') {
    const { type, id, ...rest } = branch;
    return prisma.branch.create({
      data: {
        ...rest,
        organization: {
          connect: {
            id: organizationId,
          },
        },
      },
    });
  } else {
    const { type, id, ...rest } = branch;
    return prisma.branch.update({
      data: {
        ...rest,
        organization: {
          connect: {
            id: organizationId,
          },
        },
      },
      where: {
        id: id,
      },
    });
  }
};

export default createBranch;
