import moment from 'moment';
import { STANDARD_DATE_FORMAT, CALENDAR_DATE_FORMAT } from './constants';

export const getStartOfDay = date => moment(date).startOf('day').toDate();
export const getEndOfDay = date => moment(date).endOf('day').toDate();

export const formatDate = (date, format = STANDARD_DATE_FORMAT) =>
  moment(date).format(format);

export const isAfterToday = date => moment(date).isAfter(moment(), 'days');
export const isBeforeToday = date => moment(date).isBefore(moment(), 'days');

export const isAfterMoment = date => moment(date).isAfter(moment());
export const isBeforeMoment = date => moment(date).isBefore(moment());

export const isDateBefore = (d1, d2) => moment(d1).isBefore(moment(d2));

export const startWeekOfMonthDay = date =>
  moment(date).clone().startOf('month').startOf('week').toDate();
export const endWeekOfMonthDay = date =>
  moment(date).clone().endOf('month').endOf('week').toDate();

export const format = (date, format = 'DD-MM-YYYY') =>
  moment(date).format(format);

export const formatCalendarDate = date => format(date, CALENDAR_DATE_FORMAT);

export const getWeekDays = () => {
  const weekStart = moment().startOf('month');
  const days = [];
  for (let i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, 'days').format(CALENDAR_DATE_FORMAT));
  }
  return days;
};

export const getMonthDays = () => {
  const daysInMonth = [];

  const monthDate = moment().startOf('month');

  for (let i = 0; i < monthDate.daysInMonth(); i++) {
    const newDay = monthDate.clone().add(i, 'days');
    daysInMonth.push(newDay.format(CALENDAR_DATE_FORMAT));
  }

  return daysInMonth;
};
