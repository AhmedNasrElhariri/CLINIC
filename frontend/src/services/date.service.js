import moment from 'moment';

export const getStartOfDay = date => moment(date).startOf('day').toDate();
export const getEndOfDay = date => moment(date).endOf('day').toDate();

export const startWeekOfMonthDay = date =>
  moment(date).clone().startOf('month').startOf('week').toDate();
export const endWeekOfMonthDay = date =>
  moment(date).clone().endOf('month').endOf('week').toDate();

export const format = (date, format = 'DD-MM-YYYY') =>
  moment(date).format(format);
