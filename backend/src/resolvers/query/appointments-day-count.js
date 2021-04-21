import { prisma } from '@';
import moment from 'moment';
import * as R from 'ramda';
import { APPOINTMENTS_STATUS } from '@/utils/constants';
const appointmentsDayCount = async (_, { date }) => {
  const byAppointmentStatus = R.groupBy(function (appointment) {
    const status = appointment.status;
    return status === APPOINTMENTS_STATUS.WAITING
      ? 'waitingList'
      : 'totalAppointments';
  });
  const endOfDay = moment(date).endOf('day').toDate();
  const startOfDay = moment(date).startOf('day').toDate();
  let appointmentsDayCount = {
    totalAppointment: 0,
    totalWaiting: 0,
  };
  const allAppointments = await prisma.appointment.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });
  const statistics = byAppointmentStatus(allAppointments);
  appointmentsDayCount.totalAppointment =
    statistics['totalAppointments'] === undefined
      ? 0
      : statistics['totalAppointments'].length;
  appointmentsDayCount.totalWaiting =
    statistics['waitingList'] === undefined
      ? 0
      : statistics['waitingList'].length;
  return appointmentsDayCount;
};

export default appointmentsDayCount;
