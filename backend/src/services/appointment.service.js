import moment from 'moment';

import { EXMAINTATION_LENGTH, EXMATION_STARTING_HOUR } from '@/utils/constants';

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
