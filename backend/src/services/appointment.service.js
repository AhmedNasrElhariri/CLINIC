import moment from 'moment';

import {
  APPOINTMENTS_STATUS,
  EXMAINTATION_LENGTH,
  EXMATION_STARTING_HOUR,
} from '@/utils/constants';

export const getAppointmentLength = () => EXMAINTATION_LENGTH;
export const getSessionsStartingHour = () => EXMATION_STARTING_HOUR;
export const calculateAppointmentTime = (
  appointments = [],
  date = new Date()
) =>
  moment(date)
    .startOf('day')
    .set('hour', getSessionsStartingHour())
    .add(getAppointmentLength() * appointments.length, 'minute')
    .toDate();

export const validDate = (newDate, appointments) => {
  return appointments.every(({ date }) => {
    const startDate = moment(date);
    const endDate = moment(startDate).add(5, 'minutes');
    return !moment(newDate).isBetween(startDate, endDate, 'minutes', '[)');
  });
};
