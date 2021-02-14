import { prisma } from '@';
import * as R from 'ramda';

import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';

const appointments = async (_, { input }, { userId, organizationId }) => {
  const ids = await listFlattenUsersTreeIds({
    userId,
    organizationId,
    action: ACTIONS.List_Appointment,
  });

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
