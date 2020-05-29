import { prisma } from '@';

const myClinic = (_, __, { userId }) => {
  return prisma.user.findOne({ where: { id: userId } }).clinic();
};

export default myClinic;
