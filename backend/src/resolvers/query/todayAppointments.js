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
    false
  );
  const DAY = new Date();
  const HOUR = DAY.getHours();
  let from = new Date();
  let to = new Date();

  if (HOUR < 3) {
    from = moment(DAY).subtract(1, 'd').startOf('day').toDate();
    to = moment(DAY).endOf('day').toDate();
  } else {
    from = moment(DAY).startOf('day').toDate();
    to = moment(DAY).endOf('day').toDate();
  }

  const appointments = await prisma.appointment.findMany({
    where: {
      OR: [
        {
          doctorId: {
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
