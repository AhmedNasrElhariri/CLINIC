import { prisma } from '@';
import { APIExceptcion } from '@/services/erros.service';
import { GetLevel } from '@/services/get-level';
import { storeHistoryOfAddition } from '@/services/inventory.service';
import * as R from 'ramda';

const addItem = async (_, { item: input }, { userId, organizationId }) => {
  if (R.isNil(userId) || R.isNil(input.itemId)) {
    throw new APIExceptcion('invalid user');
  }
  const persistedItem = await prisma.item.findUnique({
    where: {
      id: input.itemId,
    },
  });
  const { itemId, specialtyId, branchId, userId: userID } = input;
  const level = GetLevel(branchId, specialtyId, userID);
  const persistedInventoryItem = await prisma.inventoryItem.findMany({
    where: {
      branchId,
      specialtyId,
      doctorId: userID,
      itemId: itemId,
    },
  });
  const inventoryId =
    persistedInventoryItem.length > 0 ? persistedInventoryItem[0].id : null;
  const inventoryItemQuantity = R.propOr(
    0,
    'quantity'
  )(persistedInventoryItem.length > 0 ? persistedInventoryItem[0] : {});
  const totalQuantity = R.propOr(0, 'quantity')(persistedItem);
  const newtotalQuantity = inventoryItemQuantity + totalQuantity * input.amount;

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
        quantity: newtotalQuantity,
        price: input.price,
        organization: {
          connect: {
            id: organizationId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        level: level,
        InventoryItemConsumption: {
          create: {
            numberOfUnits: totalQuantity * input.amount,
            price: input.price,
          },
        },
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
      },
      userID && {
        doctor: {
          connect: {
            id: userID,
          },
        },
      }
    ),
    update: {
      quantity: newtotalQuantity,
      price: input.price,
      InventoryItemConsumption: {
        create: {
          numberOfUnits: totalQuantity * input.amount,
          price: input.price,
        },
      },
    },
    where: {
      id: inventoryId || '',
    },
  });
};

export default addItem;
