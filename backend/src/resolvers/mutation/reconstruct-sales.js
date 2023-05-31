import { prisma } from '@';

const reconstructSales = async (_, { sales }, { userId }) => {
  let { branchId, operation, numberOfUnits, noOfBoxes, itemId } = sales;
  if (operation === 'Subtract') {
    numberOfUnits = -1 * numberOfUnits;
    noOfBoxes = -1 * noOfBoxes;
  }
  const inventoryItemConsumptions = await prisma.inventoryItemConsumption.findMany(
    {
      where: Object.assign(
        { inventoryItemId: itemId, status: 'Active' },
        operation === 'Subtract' && {
          numberOfUnits: { gte: numberOfUnits },
        }
      ),
      orderBy: { insertionDate: 'desc' },
    }
  );
  if (inventoryItemConsumptions.length === 0) {
    throw new APIExceptcion('You can not do this operation!');
  }
  return prisma.inventoryItemConsumption.update({
    where: { id: inventoryItemConsumptions[0].id },
    data: {
      numberOfUnits: inventoryItemConsumptions[0].numberOfUnits + numberOfUnits,
    },
  });
};

export default reconstructSales;
