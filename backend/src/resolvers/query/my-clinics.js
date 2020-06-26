import { prisma } from '@';

const myClinic = (_, __, { userId }) => {
  return prisma.clinic.findMany({
    where: { users: { some: { id: userId } } },
  });
};

export default myClinic;
