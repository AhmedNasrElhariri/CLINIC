import { prisma } from '@';

const deleteFaceOperation = async (_, { id }) => {
  return await prisma.faceOperation.delete({
    where: {
      id: id,
    },
  });
};

export default deleteFaceOperation;
