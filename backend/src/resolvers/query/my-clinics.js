import { prisma } from '@';
import { APIExceptcion } from '@/services/erros.service';

const myClinic = (_, __, { userId }) => {
  if (!userId) {
    throw new APIExceptcion('invalid userid');
  }
  return prisma.clinic.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
  });
};

export default myClinic;
