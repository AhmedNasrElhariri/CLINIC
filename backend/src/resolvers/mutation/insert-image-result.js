import { prisma } from '@';
import { IMAGE_STATUS } from '@/utils/constants';

const insertImageResult = async (_, { image }) => {
  const { id, documents, value } = image;
  return prisma.image.update({
    data: {
      id,
      value,
      status: IMAGE_STATUS.COMPLETED,
      documents: {
        connect: documents.map(docId => ({
          id: docId,
        })),
      },
    },
    where: {
      id,
    },
  });
};

export default insertImageResult;
