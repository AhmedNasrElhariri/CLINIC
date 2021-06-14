import { prisma } from '@';
import * as R from 'ramda';

import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';

const appointments = async (_, { input }, { user, organizationId }) => {
  const ids = await listFlattenUsersTreeIds({
    user,
    organizationId,
    action: ACTIONS.List_Appointment,
  });

  return prisma.appointment.findMany({
    where: {
      date: {
        gte: R.prop('fromDate')(input),
        lte: R.prop('toDate')(input),
      },
      doctorId: {
        in: ids,
      },
    },
    include: {
      specialty: true,
      branch: true,
      doctor:true,
    },
  });
};

export default appointments;
