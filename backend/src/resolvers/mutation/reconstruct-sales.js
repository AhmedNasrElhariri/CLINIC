import { prisma } from '@';
import { createHistory } from '@/services/inventory.service';
import { INVENTORY_OPERATION } from '@/utils/constants';

const reconcilateSales = async (_, { sales }, { userId, organizationId }) => {
  let { branchId, operation, numberOfUnits, noOfBoxes, itemId } = sales;

  const inventoryItemConsumptions = await prisma.inventoryItemConsumption.findMany(
    {
      where: Object.assign(
        { inventoryItemId: itemId, status: 'Active' },
        operation === 'Subtract' && {
          numberOfUnits: { gte: numberOfUnits },
        }
      ),
      include: {
        inventoryItem: { include: { item: true } },
      },
      orderBy: { insertionDate: 'desc' },
    }
  );
  if (inventoryItemConsumptions.length === 0) {
    throw new APIExceptcion('You can not do this operation!');
  }

  const {
    price,
    inventoryItem: {
      item: { sellingPricePerUnit, id },
    },
  } = inventoryItemConsumptions[0];
  const totalPrice =
    operation === 'Add'
      ? sellingPricePerUnit * numberOfUnits
      : -1 * sellingPricePerUnit * numberOfUnits;
  const totalCost =
    operation === 'Add' ? price * numberOfUnits : -1 * price * numberOfUnits;

  await createHistory(
    { itemId: id, quantity: numberOfUnits, totalPrice, totalCost, branchId },
    userId,
    organizationId,
    null,
    null,
    branchId,
    INVENTORY_OPERATION.RECONCILIATE,
    null
  );

  if (operation === 'Subtract') {
    numberOfUnits = -1 * numberOfUnits;
  }

  return prisma.inventoryItemConsumption.update({
    where: { id: inventoryItemConsumptions[0].id },
    data: {
      numberOfUnits: inventoryItemConsumptions[0].numberOfUnits + numberOfUnits,
    },
  });
};

export default reconcilateSales;
