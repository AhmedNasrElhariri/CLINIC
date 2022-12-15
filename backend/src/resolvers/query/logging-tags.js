import { prisma } from '@';

const loggingTags = () => {
  return prisma.loggingTag.findMany({});
};

export default loggingTags;
