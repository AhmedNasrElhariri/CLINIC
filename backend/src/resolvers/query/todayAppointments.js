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
  // moment(new Date()).hours() >= 5 ? moment(new Date()) : moment(new Date()).subtract(1, 'days');

  // const from = refDate.set({
  //   hours: 6,
  //   minutes: 0,
  //   seconds: 0,
  //   milliseconds: 0,
  // }).toDate();
  // const to = moment(from).add(1, 'days').toDate();
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
