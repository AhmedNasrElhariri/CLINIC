import { prisma } from '@';
import * as R from 'ramda';
import { INVENTORY_OPERATION } from '@/utils/constants';

export const updatedUsedMaterials = async (organizationId, items) => {
  const persistedItems = await prisma.inventoryItem.findMany({
    where: {
      organizationId,
    },
  });
  const args = items.map(({ itemId, quantity }) => {
    const persistedItem = R.find(R.propEq('id', itemId))(persistedItems);
    return {
      data: {
        quantity: persistedItem.quantity - quantity,
      },
      where: {
        organizationId,
        id: itemId,
      },
    };
  });

  //eslint-disable-next-line
  await Promise.all(args.map(d => prisma.inventoryItem.updateMany(d)));
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
