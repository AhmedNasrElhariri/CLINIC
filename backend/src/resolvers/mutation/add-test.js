import { prisma } from '@';

const addTest = async (_, { test }) => {
  console.log(test);
  return prisma.test.create({
    data: {
      ...test,
    },
  });
};

export default addTest;
