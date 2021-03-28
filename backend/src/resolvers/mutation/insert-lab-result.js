import { prisma } from '@';
import { LAB_STATUS } from '@/utils/constants';

const insertLabResult = async (_, { lab }) => {
  const { id, documents, value } = lab;

  return prisma.lab.update({
    data: {
      id,
      value,
      status: LAB_STATUS.COMPLETED,
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

export default insertLabResult;
