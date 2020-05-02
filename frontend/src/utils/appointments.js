import moment from 'moment';
import { FIRST_EXMATION } from './constants';
import { EXMAINTATION_TIME } from 'utils/constants';

export const getAppointmentTime = (appointment, sequence) =>
  moment(appointment.date)
    .startOf('day')
    .set('hour', FIRST_EXMATION)
    .add(EXMAINTATION_TIME * sequence, 'minute')
    .format('h:mm a');
