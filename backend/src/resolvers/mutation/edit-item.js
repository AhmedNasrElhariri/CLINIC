import { prisma } from '@';

const updateItem = async (_, { item }) => {
  const { sellingPrice, alertNumberOfUnits, id, quantity, ...rest } = item;
  return prisma.item.update({
    data: Object.assign(
      {
        ...rest,
      },
      sellingPrice && { sellingPricePerBox: sellingPrice },
      sellingPrice && { sellingPricePerUnit: sellingPrice / quantity },
      alertNumberOfUnits && { alertNumberOfBoxes: alertNumberOfUnits }
    ),
    where: {
      id,
    },
  });
};

export default updateItem;
