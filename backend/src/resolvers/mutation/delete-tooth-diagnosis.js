import { prisma } from '@';

const deleteToothDiagnosis = async (_, { id }) => {
  return await prisma.toothTransaction.delete({
    where: {
      id: id,
    },
  });
};

export default deleteToothDiagnosis;
