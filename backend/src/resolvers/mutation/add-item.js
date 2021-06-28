import { prisma } from '@';
import { APIExceptcion } from '@/services/erros.service';
import { storeHistoryOfAddition } from '@/services/inventory.service';
import * as R from 'ramda';
import { createInventoryExpense } from '../../services/expense.service';

const addItem = async (_, { item: input }, { userId, organizationId }) => {
  if (R.isNil(userId) || R.isNil(input.itemId)) {
    throw new APIExceptcion('invalid user');
  }

  const persistedItem = await prisma.item.findUnique({
    where: {
      id: input.itemId,
    },
  });
  const { itemId, specialtyId, branchId, level } = input;

  const persistedInventoryItem = await prisma.inventoryItem.findUnique({
    where: {
      itemId_userId: {
        itemId,
        userId,
      },
    },
  });

  const inventoryItemQuantity = R.propOr(0, 'quantity')(persistedInventoryItem);
  const totalQuantity = R.propOr(0, 'quantity')(persistedItem);

  const newtotalQuantity = inventoryItemQuantity + totalQuantity * input.amount;

  await createInventoryExpense({
    name: `${persistedItem.name} X ${input.amount}`,
    price: input.amount * input.price,
    userId,
    organizationId
  });

  await storeHistoryOfAddition({
    itemId,
    userId,
    organizationId,
    quantity: input.amount,
    price: input.price,
  });

  return prisma.inventoryItem.upsert({
    create: Object.assign(
      {
        item: {
          connect: {
            id: itemId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        quantity: newtotalQuantity,
        organization: {
          connect: {
            id: organizationId,
          },
        },
        level: level,
      },
      specialtyId && {
        specialty: {
          connect: {
            id: specialtyId,
          },
        },
      },
      branchId && {
        branch: {
          connect: {
            id: branchId,
          },
        },
      }
    ),
    update: {
      quantity: newtotalQuantity,
    },
    where: {
      itemId_userId: {
        itemId: input.itemId,
        userId,
      },
    },
  });
};

export default addItem;
