import { prisma } from '@';
import moment from 'moment';
import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';

const todayAppointments = async (
  _,
  { offset, limit, status, doctorId, specialtyId, branchId, patient },
  { user, organizationId }
) => {
  const finalStatus =
    status === 'Scheduled' ? ['Scheduled', 'Changed'] : [status];
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
      organizationId,
      branchId,
      specialtyId,
      doctorId,
      date: {
        gte: from,
        lte: to,
      },
      status: {
        in: finalStatus,
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
      user: true,
      session: true,
      patient: true,
      doctor: true,
    },
  });
  const appointmentsCount = await prisma.appointment.count({
    where: {
      organizationId,
      branchId,
      specialtyId,
      doctorId,
      date: {
        gte: from,
        lte: to,
      },
      status: {
        in: finalStatus,
      },
    },
  });
  return { appointments: appointments, appointmentsCount };
};

export default todayAppointments;
