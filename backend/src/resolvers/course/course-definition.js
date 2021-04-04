import { prisma } from '@';

const courseDefinition = ({ id }) => {
  return prisma.course.findOne({ where: { id } }).courseDefinition();
};

export default courseDefinition;
