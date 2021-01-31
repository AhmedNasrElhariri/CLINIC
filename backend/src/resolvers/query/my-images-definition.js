import { prisma } from '@';

const myImagesDefinition = (_, __,{ userId }) => {
  return prisma.imageDefinition.findMany({
    where:{
      userId
    }
  });
};

export default myImagesDefinition;
