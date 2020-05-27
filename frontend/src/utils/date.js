import moment from 'moment';
import { STANDARD_DATE_FORMAT } from './constants';

export const formatDate = (date, format = STANDARD_DATE_FORMAT) =>
  moment(date).format(format);

export const isAfterToday = date => moment(date).isAfter(moment(), 'days');
export const isBeforeToday = date => moment(date).isBefore(moment(), 'days');

export const isAfterMoment = date => moment(date).isAfter(moment());
export const isBeforeMoment = date => moment(date).isBefore(moment());
