import { prisma } from '@';
import * as R from 'ramda';
import { APIExceptcion } from '@/services/erros.service';
const addSales = async (_, { sales }, { organizationId, userId }) => {
  const persistedItems = await prisma.salesDefinition.findMany({
    where: {
      organizationId,
      id: {
        in: R.map(R.prop('itemId'))(sales),
      },
    },
  });
  const updatedSalesDefinitions = sales.map(({ itemId, quantity }) => {
    const persistedItem = R.find(R.propEq('id', itemId))(persistedItems);
    const { totalQuantity: oldQuantity, id, ...rest } = persistedItem;
    const newQuantity = oldQuantity - quantity;
    if (newQuantity < 0) {
      throw new APIExceptcion('This Item is not exist');
    }
    return {
      data: {
        totalQuantity: newQuantity,
        ...rest,
      },
      where: {
        id,
      },
    };
  });

  const args = sales.map(({ itemId, quantity }) => {
    const persistedItem = R.find(R.propEq('id', itemId))(persistedItems);
    return {
      data: {
        quantity: quantity,
        totalPrice: persistedItem.price * quantity,
        totalCost: persistedItem.cost * quantity,
        date: new Date(),
        organizationId,
        userId,
        salesDefinitionId: itemId,
      },
    };
  });
  Promise.all(
    updatedSalesDefinitions.map(s => prisma.salesDefinition.update(s))
  );
  const allSales = Promise.all(args.map(a => prisma.sales.create(a)));
  return allSales;
};

export default addSales;
