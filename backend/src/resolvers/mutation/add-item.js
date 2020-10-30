import { prisma } from '@';
import { APIExceptcion } from '@/services/erros.service';
import { storeHistoryOfAddition } from '@/services/inventory.service';
import * as R from 'ramda';
import { createInventoryExpense } from '../../services/expense.service';

const addItem = async (_, { item, clinicId }, { userId }) => {
  if (R.isNil(clinicId) || R.isNil(item.itemId)) {
    throw new APIExceptcion('invalid clinic or item');
  }

  const persistedItem = await prisma.item.findOne({
    where: {
      id: item.itemId,
    },
  });

  const { itemId } = item;

  const persistedInventoryItem = await prisma.inventoryItem.findOne({
    where: {
      itemId_clinicId: {
        itemId,
        clinicId,
      },
    },
  });

  const quantity = R.propOr(0, 'quantity')(persistedInventoryItem);
  const totalQuantity = R.propOr(0, 'quantity')(persistedItem);

  const newtotalQuantity = totalQuantity + quantity * item.amount;

  await createInventoryExpense({
    name: `${persistedItem.name} X ${item.amount}`,
    price: item.amount * item.price,
    clinicId,
  });

  await storeHistoryOfAddition({
    clinicId,
    itemId,
    userId,
    quantity: item.amount,
    price: item.price,
  });

  return prisma.inventoryItem.upsert({
    create: {
      item: {
        connect: {
          id: itemId,
        },
      },
      clinic: {
        connect: {
          id: clinicId,
        },
      },
      quantity: newtotalQuantity,
    },
    update: {
      quantity: newtotalQuantity,
    },
    where: {
      itemId_clinicId: {
        itemId: item.itemId,
        clinicId,
      },
    },
  });
};

export default addItem;
