import { prisma } from '@';
import moment from 'moment';
import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS, APPOINTMENTS_STATUS } from '@/utils/constants';

const todayAppointments = async (
  _,
  { offset, limit },
  { user, organizationId }
) => {
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
      status: {
        notIn: [APPOINTMENTS_STATUS.CANCELLED],
      },
    },
    orderBy: [
      {
        date: 'asc',
      },
    ],
    skip: offset,
    take: limit,
    include: {
      specialty: true,
      branch: true,
      user: true,
      session: true,
      patient: true,
      doctor: true,
    },
  });
  const appointmentsCount = await prisma.appointment.count({
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
      status: {
        notIn: [APPOINTMENTS_STATUS.CANCELLED],
      },
    },
  });
  return { appointments: appointments, appointmentsCount: appointmentsCount };
};

export default todayAppointments;
