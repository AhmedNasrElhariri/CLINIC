import { prisma } from '@';

const loggingTags = () => {
  console.log('LLLLLL');
  return prisma.loggingTag.findMany({});
};

export default loggingTags;
