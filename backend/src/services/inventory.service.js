import { prisma } from '@';
import * as R from 'ramda';
import { INVENTORY_OPERATION } from '@/utils/constants';
import { APIExceptcion } from '@/services/erros.service';
import { GetLevel } from '@/services/get-level';
import { InventoryConsumedStatus } from '@/utils/constants';
import getQuantity from './get-quantity-of-inventory-item';

export const createRevenueFromInventory = (data, organizationId) => {
  return data.map(
    ({
      consumedUnits,
      pricePerUnit,
      inventoryItem: {
        item: { name, sellingPricePerUnit, quantity },
        branchId,
        userId,
      },
    }) => ({
      branchId,
      userId,
      date: new Date(),
      name: `selling ${
        consumedUnits / quantity
      } boxes (${consumedUnits} units)  of  ${name}`,
      amount: consumedUnits * pricePerUnit,
      organizationId,
    })
  );
};
export const finalReducedItems = (items, quantity, pricePerUnit) => {
  const total = quantity;
  const orderedItems = R.sortWith([R.ascend(R.prop('insertionDate'))])(items);
  const reducedOrderedItesm = orderedItems.map(item => {
    let x = 0;
    if (item.status === InventoryConsumedStatus.ACTIVE) {
      x = quantity < item.numberOfUnits ? quantity : item.numberOfUnits;
      quantity -= x;
    }
    return { ...item, consumedUnits: x, pricePerUnit };
  });
  const unitsPerBox = reducedOrderedItesm[0].inventoryItem.item.quantity;
  if (quantity > 0) {
    throw new APIExceptcion(
      `You have been finished this items - you should use only ${
        (total - quantity) / unitsPerBox
      } boxes (${total - quantity} units)`
    );
  }
  return reducedOrderedItesm;
};

export const reduceFromInventoryConsumptions = (items, groupedValus) => {
  let vv = [];
  for (const [id, consuptionItems] of Object.entries(groupedValus)) {
    const item = R.find(R.propEq('itemId', id))(items);
    const finalItems = finalReducedItems(
      consuptionItems,
      item.quantity,
      item.pricePerUnit
    );
    const finalObject = { id: id, quantity: item.quantity, items: finalItems };
    vv.push(finalObject);
  }
  return vv;
};

export const reducedInventoryPattern = async (
  organizationId,
  items,
  isSelling
) => {
  const persistedItems = await prisma.inventoryItem.findMany({
    where: {
      organizationId,
    },
  });
  const persistedItemsIds = R.map(R.propOr(null, 'itemId'))(items);
  const consumptionItems = await prisma.inventoryItemConsumption.findMany({
    where: {
      inventoryItemId: {
        in: persistedItemsIds,
      },
    },
    include: {
      inventoryItem: {
        include: {
          item: true,
        },
      },
    },
  });
  const groubedVals = R.groupBy(R.prop('inventoryItemId'))(consumptionItems);
  const finishedItems = reduceFromInventoryConsumptions(items, groubedVals);
  finishedItems.forEach(async ({ id, quantity, items }) => {
    const persistedItem = R.find(R.propEq('id', id))(persistedItems);
    const filteredItems = items.filter(it => it.consumedUnits > 0);
    if (isSelling) {
      const updateInventoryItem = prisma.inventoryItem.update({
        where: {
          id,
        },
        data: {
          quantity: persistedItem.quantity - quantity,
          InventoryItemConsumption: {
            update: filteredItems.map(
              ({ consumedUnits, id, numberOfUnits }) => {
                return {
                  data: { numberOfUnits: numberOfUnits - consumedUnits },
                  where: {
                    id: id,
                  },
                };
              }
            ),
          },
        },
      });

      await prisma.$transaction([updateInventoryItem]);
    } else {
      await prisma.inventoryItem.update({
        where: {
          id,
        },
        data: {
          quantity: persistedItem.quantity - quantity,
          InventoryItemConsumption: {
            update: filteredItems.map(
              ({ consumedUnits, id, numberOfUnits }) => {
                return {
                  data: { numberOfUnits: numberOfUnits - consumedUnits },
                  where: {
                    id: id,
                  },
                };
              }
            ),
          },
        },
      });
    }
  });
  return finishedItems;
};

export const updatedUsedMaterials = async (
  organizationId,
  items,
  isSelling
) => {
  await reducedInventoryPattern(organizationId, items, isSelling);
  return prisma.inventoryItem.findMany({
    where: {
      organizationId,
    },
  });
};

export const storeHistoryOfAddition = async ({
  itemId,
  organizationId,
  userId,
  quantity,
  price,
  branchId,
  specialtyId,
}) => {
  return prisma.inventoryHistory.create({
    data: Object.assign(
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
        organization: {
          connect: {
            id: organizationId,
          },
        },
        operation: INVENTORY_OPERATION.ADD,
        quantity,
        price,
        date: new Date(),
      },
      branchId && { branch: { connect: { id: branchId } } },
      specialtyId && { specialty: { connect: { id: specialtyId } } }
    ),
  });
};

export const storeHistoryOfTransfer = async ({
  itemId,
  organizationId,
  userId,
  quantity,
  price,
  branchId,
  specialtyId,
  subOperation,
}) => {
  return prisma.inventoryHistory.create({
    data: Object.assign(
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
        organization: {
          connect: {
            id: organizationId,
          },
        },
        operation: INVENTORY_OPERATION.TRANSFER,
        quantity,
        price,
        date: new Date(),
      },
      branchId && { branch: { connect: { id: branchId } } },
      specialtyId && { specialty: { connect: { id: specialtyId } } },
      subOperation && { subOperation: subOperation }
    ),
  });
};

export const mapHistoryToMessage = async history => {
  const userIds = R.map(R.prop('userId'))(history);
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
  });
  return history.map(h => {
    const user = R.find(R.propEq('id', h.userId))(users);
    const patientName = R.pathOr('', ['patient', 'name'])(h);
    const doctorName = R.pathOr('', ['doctor', 'name'])(h);
    const branchName = R.pathOr('', ['branch', 'name'])(h);
    const specialtyName = R.pathOr('', ['specialty', 'name'])(h);
    return {
      body: createHistoryBody(
        h,
        user,
        patientName,
        doctorName,
        branchName,
        specialtyName
      ),
      date: h.date,
      newNoOfBoxes: h.newNoOfBoxes,
      oldNoOfBoxes: h.oldNoOfBoxes,
    };
  });
};

export const createHistory = (
  i,
  userId,
  organizationId,
  specialtyId,
  doctorId,
  branchId,
  operation,
  patientId
) => {
  return prisma.inventoryHistory.create({
    data: Object.assign(
      {
        item: {
          connect: {
            id: i.itemId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        organization: {
          connect: {
            id: organizationId,
          },
        },
        operation: operation,
        quantity: i.quantity,
        totalPrice: i.totalPrice,
        totalCost: i.totalCost,
        date: new Date(),
        oldNoOfBoxes: i.oldNoOfBoxes,
        newNoOfBoxes: i.newNoOfBoxes,
      },
      specialtyId && {
        specialty: {
          connect: {
            id: specialtyId,
          },
        },
      },
      i.branchId && {
        branch: {
          connect: {
            id: i.branchId,
          },
        },
      },
      doctorId && {
        doctor: {
          connect: {
            id: doctorId,
          },
        },
      },
      patientId && {
        patient: {
          connect: {
            id: patientId,
          },
        },
      }
    ),
  });
};

export const createSubstractHistoryForMultipleItems = async ({
  patientId,
  userId,
  specialtyId,
  doctorId,
  organizationId,
  data,
  isSelling,
}) => {
  const itemsIds = R.map(R.prop('itemId'))(data);
  const inventoryItems = await prisma.inventoryItem.findMany({
    where: {
      id: {
        in: itemsIds,
      },
    },
    include: { item: true },
  });
  const items = inventoryItems.map(i => {
    const item = R.find(R.propEq('itemId', i.id))(data);

    return {
      itemId: i.itemId,
      quantity: item.quantity,
      branchId: i.branchId,
      totalPrice: isSelling
        ? item.quantity * item.pricePerUnit
        : i.quantity * i.price,
      totalCost: item.quantity * i.price,
      oldNoOfBoxes: i.quantity / i.item.quantity,
      newNoOfBoxes:
        i.quantity / i.item.quantity - item.quantity / i.item.quantity,
    };
  });
  const operation = isSelling
    ? INVENTORY_OPERATION.SELL
    : INVENTORY_OPERATION.SUBSTRACT;
  return Promise.all(
    items.map(i =>
      createHistory(
        i,
        userId,
        organizationId,
        specialtyId,
        doctorId,
        null,
        operation
      )
    )
  );
};

export const createHistoryBody = async (
  { operation, price, quantity, item, subOperation, totalPrice },
  user,
  patientName,
  doctorName,
  branchName,
  specialtyName
) => {
  switch (operation) {
    case INVENTORY_OPERATION.ADD:
      return `${user.name} added ${
        quantity / item.quantity
      } boxes(${quantity} units) of ${item.name} which cost (${
        price * quantity
      } L.E) per box (${price} L.E.) per unit to ${
        patientName
          ? `${patientName}`
          : doctorName
          ? `${doctorName}`
          : specialtyName
          ? `${specialtyName}`
          : branchName
          ? `${branchName}`
          : ''
      }`;
    case INVENTORY_OPERATION.SELL:
      return `${user.name} sold ${
        quantity / item.quantity
      } boxes(${quantity} units) of ${item.name}  from ${
        branchName ? `${branchName}` : 'Organization warehouse'
      } ${patientName && `to ${patientName ? `${patientName}` : ''}`}`;
    case INVENTORY_OPERATION.SUBSTRACT:
      return `${user.name} consumed ${
        quantity / item.quantity
      } boxes(${quantity} ${
        item.unitOfMeasure === 'PerUnit' ? 'units' : item.unitOfMeasure
      } ) of ${item.name}  from ${
        branchName ? `${branchName}` : 'Organization warehouse'
      } ${patientName && `to ${patientName ? `${patientName}` : ''}`} `;
    case INVENTORY_OPERATION.TRANSFER:
      return `${user.name} ${subOperation} ${
        quantity / item.quantity
      } boxes(${quantity} ${
        item.unitOfMeasure === 'PerUnit' ? 'units' : item.unitOfMeasure
      } ) of ${item.name}  from ${
        branchName ? `${branchName}` : 'Organization warehouse'
      }  `;
    case INVENTORY_OPERATION.RECONCILIATE:
      return `${user.name} Reconciliated ${
        totalPrice > 0 ? '(Add)' : '(Subtract) '
      }${quantity / item.quantity} boxes(${quantity} units) of ${
        item.name
      }  from ${branchName ? `${branchName}` : 'Organization warehouse'} ${
        patientName && `to ${patientName ? `${patientName}` : ''}`
      }`;
  }
};

export const createInventoryItem = async (
  input,
  { userId, organizationId, notCreateHistory }
) => {
  if (R.isNil(userId) || R.isNil(input.itemId)) {
    throw new APIExceptcion('invalid user');
  }
  const {
    itemId,
    specialtyId,
    branchId,
    userId: toUserId,
    status,
    fromItemId,
    noOfBoxes,
    purshasingPricePerUnit,
    purshasingPricePerBox,
    amount,
  } = input;
  const level = GetLevel(branchId, specialtyId, null);
  const persistedInventoryItem = await prisma.inventoryItem.findMany({
    where: {
      branchId,
      specialtyId: null,
      doctorId: null,
      itemId: itemId,
    },
  });
  const inventoryId =
    persistedInventoryItem.length > 0 ? persistedInventoryItem[0].id : null;
  const inventoryItemQuantity = R.propOr(
    0,
    'quantity'
  )(persistedInventoryItem.length > 0 ? persistedInventoryItem[0] : {});
  const newtotalQuantity = inventoryItemQuantity + amount;

  if (!notCreateHistory) {
    await storeHistoryOfAddition({
      itemId,
      userId,
      organizationId,
      quantity: amount,
      price: purshasingPricePerUnit,
      branchId,
      specialtyId,
    });
  }

  return prisma.inventoryItem.upsert({
    create: Object.assign(
      {
        item: {
          connect: {
            id: itemId,
          },
        },
        quantity: newtotalQuantity,
        price: purshasingPricePerUnit,
        purshasingPricePerBox,
        noOfBoxes,
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
          create: Object.assign(
            {
              numberOfUnits: amount,
              price: purshasingPricePerUnit,
              userId: toUserId !== null ? toUserId : userId,
            },
            status && { status: status },
            fromItemId && { fromInventoryItemId: fromItemId }
          ),
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
      }
    ),
    update: {
      quantity: newtotalQuantity,
      price: purshasingPricePerUnit,
      purshasingPricePerBox,
      noOfBoxes,
      InventoryItemConsumption: {
        create: Object.assign(
          {
            numberOfUnits: amount,
            price: purshasingPricePerUnit,
            userId: toUserId !== null ? toUserId : userId,
          },
          status && { status: status },
          fromItemId && { fromInventoryItemId: fromItemId }
        ),
      },
    },
    where: {
      id: inventoryId || '',
    },
  });
};
