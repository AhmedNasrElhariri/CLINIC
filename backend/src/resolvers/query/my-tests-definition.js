import { prisma } from '@';

const myTestsDefinition = (_, __,{ userId }) => {
  return prisma.testDefinition.findMany({
    where:{
      userId
    }
  });
};

export default myTestsDefinition;
