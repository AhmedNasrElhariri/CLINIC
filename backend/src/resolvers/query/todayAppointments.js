import { prisma } from '@';
import moment from 'moment';

import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';

const todayAppointments = async (_, __, { user, organizationId }) => {
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.List_Appointment,
    },
    true
  );
  const from = moment(new Date()).startOf('day').toDate();
  const to = moment(new Date()).endOf('day').toDate();
  const appointments = await prisma.appointment.findMany({
    where: {
      OR: [
        {
          userId: {
            in: ids,
          },
        },
        {
          branchId: {
            in: ids,
          },
        },
        {
          specialtyId: {
            in: ids,
          },
        },
      ],
      date: {
        gte: from,
        lte: to,
      },
    },
    orderBy: [
      {
        date: 'asc',
      },
    ],
    include: {
      specialty: true,
      branch: true,
      user: true,
      session: true,
      patient: true,
      doctor: true,
    },
  });
  return appointments;
};

export default todayAppointments;
