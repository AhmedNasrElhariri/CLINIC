import { prisma } from '@';
import * as R from 'ramda';
import { INVENTORY_OPERATION } from '@/utils/constants';

export const updatedUsedMaterials = async (appointmentId, items) => {
  const { clinicId } = await prisma.appointment.findOne({
    where: { id: appointmentId },
  });

  const persistedItems = await prisma.inventoryItem.findMany({
    where: {
      clinicId,
      itemId: {
        in: R.map(R.prop('itemId'))(items),
      },
    },
  });

  const args = items.map(({ itemId, quantity }) => {
    const persistedItem = R.find(R.propEq('itemId', itemId))(persistedItems);
    return {
      data: {
        quantity: persistedItem.quantity - quantity,
      },
      where: {
        clinicId,
        itemId,
      },
    };
  });

  //eslint-disable-next-line
  return Promise.all(args.map(d => prisma.inventoryItem.updateMany(d)));
};

export const storeHistoryOfAddition = async ({
  clinicId,
  // patientId,
  itemId,
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
      clinic: {
        connect: {
          id: clinicId,
        },
      },
      user: {
        connect: {
          id: userId,
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
    return {
      body: createHistoryBody(h, user, patientName),
      date: h.date,
    };
  });
};

export const createSubstractHistoryForMultipleItems = async ({
  clinicId,
  patientId,
  userId,
  data,
}) => {
  const args = data.map(i => {
    return {
      data: {
        item: {
          connect: {
            id: i.itemId,
          },
        },
        clinic: {
          connect: {
            id: clinicId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        patient: {
          connect: {
            id: patientId,
          },
        },
        operation: INVENTORY_OPERATION.SUBSTRACT,
        quantity: i.quantity,
        date: new Date(),
      },
    };
  });

  //eslint-disable-next-line
  return Promise.all(args.map(d => prisma.inventoryHistory.create(d)));
};

export const createHistoryBody = async (
  { operation, price, quantity, item },
  user,
  patientName
) => {
  switch (operation) {
    case INVENTORY_OPERATION.ADD:
      return `${user.name} added ${quantity} units of ${item.name} which cost ${price} L.E. per unit`;
    case INVENTORY_OPERATION.SUBSTRACT:
      return `${user.name} consumed ${quantity} ${item.unitOfMeasure} from ${
        item.name
      } ${patientName ? `to ${patientName}` : ''}`;
  }
};