import { prisma } from '@';
import { APIExceptcion } from '@/services/erros.service';
import { storeHistoryOfAddition } from '@/services/inventory.service';
import * as R from 'ramda';
import { createInventoryExpense } from '../../services/expense.service';

const addItem = async (_, { item: input, clinicId }, { userId }) => {
  if (R.isNil(clinicId) || R.isNil(input.itemId)) {
    throw new APIExceptcion('invalid clinic or item');
  }

  const persistedItem = await prisma.item.findOne({
    where: {
      id: input.itemId,
    },
  });

  const { itemId } = input;

  const persistedInventoryItem = await prisma.inventoryItem.findOne({
    where: {
      itemId_clinicId: {
        itemId,
        clinicId,
      },
    },
  });

  const inventoryItemQuantity = R.propOr(0, 'quantity')(persistedInventoryItem);
  const totalQuantity = R.propOr(0, 'quantity')(persistedItem);

  const newtotalQuantity = inventoryItemQuantity + totalQuantity * input.amount;

  await createInventoryExpense({
    name: `${persistedItem.name} X ${input.amount}`,
    price: input.amount * input.price,
    clinicId,
  });

  await storeHistoryOfAddition({
    clinicId,
    itemId,
    userId,
    quantity: input.amount,
    price: input.price,
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
        itemId: input.itemId,
        clinicId,
      },
    },
  });
};

export default addItem;
