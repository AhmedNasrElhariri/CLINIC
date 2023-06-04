import { prisma } from '@';

const updateItem = async (_, { item }) => {
  const {
    sellingPricePerBox,
    alertNumberOfBoxes,
    id,
    quantity,
    ...rest
  } = item;
  return prisma.item.update({
    data: Object.assign(
      {
        ...rest,
      },
      sellingPricePerBox && { sellingPricePerBox: sellingPricePerBox },
      sellingPricePerBox && {
        sellingPricePerUnit: sellingPricePerBox / quantity,
      },
      alertNumberOfBoxes && { alertNumberOfBoxes: alertNumberOfBoxes }
    ),
    where: {
      id,
    },
  });
};

export default updateItem;
