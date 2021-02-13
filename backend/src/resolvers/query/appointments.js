import { prisma } from '@';
import * as R from 'ramda';

import { listFlattenUsersTree } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';

const appointments = async (_, { input }, { userId, organizationId }) => {
  console.log(userId, organizationId);
  const users = await listFlattenUsersTree({
    userId,
    organizationId,
    action: ACTIONS.List_Appointment,
  });
  const ids = R.map(R.prop('id'))(users);

  return prisma.appointment.findMany({
    where: {
      date: {
        gte: R.prop('fromDate')(input),
        lte: R.prop('toDate')(input),
      },
      userId: {
        in: ids,
      },
    },
  });
};

export default appointments;
