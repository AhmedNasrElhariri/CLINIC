import { prisma } from '@';

const courseDefinition = ({ id }) => {
  return prisma.course.findUnique({ where: { id } }).courseDefinition();
};

export default courseDefinition;
