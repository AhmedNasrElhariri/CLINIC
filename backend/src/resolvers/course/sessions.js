import { prisma } from '@';

const sessions = async ({ id }) => {
  return prisma.course.findUnique({ where: { id } }).sessions();
};

export default sessions;
