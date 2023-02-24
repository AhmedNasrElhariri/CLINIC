import { prisma } from '@';
import * as R from 'ramda';
import { INVENTORY_OPERATION } from '@/utils/constants';
import { APIExceptcion } from '@/services/erros.service';

export const finalReducedItems = (items, quantity) => {
  const total = quantity;
  const orderedItems = R.sortWith([R.ascend(R.prop('insertionDate'))])(items);
  const reducedOrderedItesm = orderedItems.map(item => {
    let x = 0;
    x = quantity < item.numberOfUnits ? quantity : item.numberOfUnits;
    quantity -= x;
    return { ...item, consumedUnits: x };
  });
  if (quantity > 0) {
    throw new APIExceptcion(
      `You have been finished this items - you should use only ${
        total - quantity
      }`
    );
  }
  return reducedOrderedItesm;
};

export const reduceFromInventoryConsumptions = (items, groupedValus) => {
  let vv = [];
  for (const [id, consuptionItems] of Object.entries(groupedValus)) {
    const item = R.find(R.propEq('itemId', id))(items);
    //i have item and consuption items of the item
    const finalItems = finalReducedItems(consuptionItems, item.quantity);
    const finalObject = { id: id, quantity: item.quantity, items: finalItems };
    vv.push(finalObject);
  }
  return vv;
};

export const updatedUsedMaterials = async (organizationId, items) => {
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
      inventoryItem: true,
    },
  });
  const groubedVals = R.groupBy(R.prop('inventoryItemId'))(consumptionItems);
  const finishedItems = reduceFromInventoryConsumptions(items, groubedVals);

  finishedItems.forEach(async ({ id, quantity, items }) => {
    const persistedItem = R.find(R.propEq('id', id))(persistedItems);
    const filteredItems = items.filter(it => it.consumedUnits > 0);
    await prisma.inventoryItem.update({
      where: {
        id,
      },
      data: {
        quantity: persistedItem.quantity - quantity,
        InventoryItemConsumption: {
          update: filteredItems.map(({ consumedUnits, id, numberOfUnits }) => {
            return {
              data: { numberOfUnits: numberOfUnits - consumedUnits },
              where: {
                id: id,
              },
            };
          }),
        },
      },
    });
    // items.filter(it => it.consumedUnits > 0);
    // const upItems = items.map(({ consumedUnits, id, numberOfUnits }) => {
    //   return {
    //     data: { numberOfUnits: numberOfUnits - consumedUnits },
    //     where: {
    //       id: id,
    //     },
    //   };
    // });
    // console.log(upItems, 'upItems');
    // const updatedConsumptionItems = upItems.map(it =>
    //   prisma.inventoryItemConsumption.update(it)
    // );
    // Promise.all(
    //   items.map(it => prisma.inventoryItemConsumption.update(it))
    // );
    // await prisma.$transaction([updateInventoryItem, updatedConsumptionItems]);
  });
  ///
  // const args = items.map(({ itemId, quantity }) => {
  //   const persistedItem = R.find(R.propEq('id', itemId))(persistedItems);
  //   return {
  //     data: {
  //       quantity: persistedItem.quantity - quantity,
  //     },
  //     where: {
  //       organizationId,
  //       id: itemId,
  //     },
  //   };
  // });

  //eslint-disable-next-line
  // await Promise.all(args.map(d => prisma.inventoryItem.updateMany(d)));
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
}) => {
  return prisma.inventoryHistory.create({
    data: {
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
    };
  });
};

export const createSubstractHistoryForMultipleItems = async ({
  patientId,
  userId,
  branchId,
  specialtyId,
  doctorId,
  organizationId,
  data,
}) => {
  const itemsIds = R.map(R.prop('itemId'))(data);
  const inventoryItems = await prisma.inventoryItem.findMany({
    where: {
      id: {
        in: itemsIds,
      },
    },
  });
  const items = inventoryItems.map(i => {
    const item = R.find(R.propEq('itemId', i.id))(data);
    return {
      itemId: i.itemId,
      quantity: item.quantity,
    };
  });
  // const args = data.map(i => {
  //   return {
  //     item: {
  //       connect: {
  //         id: i.itemId,
  //       },
  //     },
  //     user: {
  //       connect: {
  //         id: userId,
  //       },
  //     },
  //     patient: {
  //       connect: {
  //         id: patientId,
  //       },
  //     },
  //     operation: INVENTORY_OPERATION.SUBSTRACT,
  //     quantity: i.quantity,
  //     date: new Date(),
  //   };
  // });
  //eslint-disable-next-line
  // return prisma.inventoryHistory.createMany({
  //   data: args,
  // });

  return Promise.all(
    items.map(i =>
      prisma.inventoryHistory.create({
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
            operation: INVENTORY_OPERATION.SUBSTRACT,
            quantity: i.quantity,
            date: new Date(),
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
      })
    )
  );
};

export const createHistoryBody = async (
  { operation, price, quantity, item },
  user,
  patientName,
  doctorName,
  branchName,
  specialtyName
) => {
  switch (operation) {
    case INVENTORY_OPERATION.ADD:
      return `${user.name} added ${quantity} units of ${item.name} which cost ${price} L.E. per unit`;
    case INVENTORY_OPERATION.SUBSTRACT:
      return `${user.name} consumed ${quantity} ${item.unitOfMeasure} from ${
        item.name
      } ${
        patientName
          ? `to patient - ${patientName}`
          : doctorName
          ? `to doctor - ${doctorName}`
          : specialtyName
          ? `to specialty - ${specialtyName}`
          : branchName
          ? `to branch - ${branchName}`
          : ''
      }`;
  }
};
