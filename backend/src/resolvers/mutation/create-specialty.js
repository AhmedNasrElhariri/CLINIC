import { prisma } from '@';
import { APIExceptcion } from '@/services/erros.service';
import { POSITION } from '@/utils/constants';

const createSpecialty = async (_, { specialty }, { user, organizationId }) => {
 
  if (user.position !== POSITION.Admin) {
    throw new APIExceptcion('not authorized user');
  }
  const { type, id, ...rest } = specialty;
  if (type === 'create') {
    return prisma.specialty.create({
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
    return prisma.specialty.update({
      data: {
        ...rest,
        organization: {
          connect: {
            id: organizationId,
          },
        },
      },
      where: {
        id,
      },
    });
  }
};

export default createSpecialty;
