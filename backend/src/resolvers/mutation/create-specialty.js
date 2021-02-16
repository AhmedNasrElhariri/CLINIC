import { prisma } from '@';
import { APIExceptcion } from '@/services/erros.service';
import { POSITION } from '@/utils/constants';

const createSpecialty = async (_, { specialty }, { user, organizationId }) => {
  if (user.position !== POSITION.Admin) {
    throw new APIExceptcion('not authorized user');
  }
  return prisma.specialty.create({
    data: {
      ...specialty,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default createSpecialty;