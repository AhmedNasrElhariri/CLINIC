import { prisma } from '@';

const deleteSales = async (_, { id }) => {
  return await prisma.sales.delete({
    where: {
      id: id,
    },
  });
};

export default deleteSales;
