import { prisma } from '@';

const barColor = async ({
  item: { alertNumberOfBoxes, quantity: itemQuantity },
  id,
}) => {
  const sum = await prisma.inventoryItemConsumption.aggregate({
    _sum: { numberOfUnits: true },
    where: { inventoryItemId: id, status: 'Active' },
  });
  const SUM = sum._sum.numberOfUnits ? sum._sum.numberOfUnits : 0;
  const noOfBoxes = SUM / itemQuantity;
  if (alertNumberOfBoxes > noOfBoxes) {
    return 'alert';
  }
};

export default barColor;
