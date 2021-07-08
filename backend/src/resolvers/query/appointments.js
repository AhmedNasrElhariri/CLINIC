import { prisma } from '@';
import * as R from 'ramda';

import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';

const appointments = async (
  _,
  { input, offset, limit },
  { user, organizationId }
) => {
  const ids = await listFlattenUsersTreeIds({
    user,
    organizationId,
    action: ACTIONS.List_Appointment,
  });
  const appointmentsCount = await prisma.appointment.count();
  const appointments = await prisma.appointment.findMany({
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
      doctor: true,
      session:true,
    },
    skip: offset,
    take: limit,
  });
  const data = {
    appointments: appointments,
    appointmentsCount: appointmentsCount,
  };
  return data;
};

export default appointments;
