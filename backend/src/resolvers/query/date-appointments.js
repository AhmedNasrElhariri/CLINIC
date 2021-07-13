import { prisma } from '@';
import moment from 'moment';


const dateAppointments = async (
  _,
  {
    dateFrom,
    dateTo,
  },
  { user, organizationId }
) => {
  const startDay = moment(dateFrom).startOf('day').toDate();
  const endDay = moment(dateTo).endOf('day').toDate();
  return  prisma.appointment.findMany({
    where: {
      date: {
        gte: startDay,
        lte: endDay,
      },
    },
    include: {
      specialty: true,
      branch: true,
      user: true,
      session: true,
      patient: true,
    },
  });
};

export default dateAppointments;
