import { prisma } from '@';

const deleteLabPhoto = async (_, { id }) => {
  return await prisma.file.delete({
    where: {
      id: id,
    },
  });
};

export default deleteLabPhoto;
