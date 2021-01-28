import { prisma } from '@';

const myTests = (_, __,) => {
  console.log("ddd");
  return prisma.test.findMany({});
};

export default myTests;
