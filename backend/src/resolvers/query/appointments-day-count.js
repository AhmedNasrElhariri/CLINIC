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
  const refDate =
    moment(date).hours() >= 5 ? moment() : moment().subtract(1, 'days');
  const startOfDay = moment(refDate).set({
    hours: 6,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const endOfDay = startOfDay.clone().add(1, 'days');

  let appointmentsDayCount = {
    totalAppointment: 0,
    totalWaiting: 0,
  };
  const allAppointments = await prisma.appointment.findMany({
    where: {
      date: {
        gte: startOfDay.toDate(),
        lte: endOfDay.toDate(),
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
