import { prisma } from '@';

const sessions = async ({ id }) => {
  return prisma.course.findOne({ where: { id } }).sessions();
};

export default sessions;
