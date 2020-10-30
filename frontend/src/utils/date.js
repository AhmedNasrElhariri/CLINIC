import moment from 'moment';
import * as R from 'ramda';
import { STANDARD_DATE_FORMAT, FULL_DAY_FORMAT } from './constants';

export const formatDate = (date, format = STANDARD_DATE_FORMAT) =>
  moment(date).format(format);

export const formatFullDay = date => formatDate(date, FULL_DAY_FORMAT);

export const isAfterToday = date => moment(date).isAfter(moment(), 'days');
export const isBeforeToday = date => moment(date).isBefore(moment(), 'days');

export const isAfterMoment = date => moment(date).isAfter(moment());
export const isBeforeMoment = date => moment(date).isBefore(moment());

export const isDateBefore = (d1, d2) => moment(d1).isBefore(moment(d2));

export const getStartOfDay = date => moment(date).startOf('day').toDate();
export const getEndOfDay = date => moment(date).endOf('day').toDate();

export const startWeekOfMonthDay = date =>
  moment(date).clone().startOf('month').startOf('week').toDate();
export const endWeekOfMonthDay = date =>
  moment(date).clone().endOf('month').endOf('week').toDate();

export const format = (date, format = 'DD-MM-YYYY') =>
  moment(date).format(format);

export const getCurrentMonthDays = () => {
  return Array.from({ length: moment().daysInMonth() }, (x, i) =>
    moment().startOf('month').add(i, 'days')
  );
};

export const getCurrentWeekDays = () => {
  return Array.from({ length: 7 }, (x, i) =>
    moment().startOf('week').add(i, 'days')
  );
};

export const getDayStartAndEnd = date => {
  return getStartAndEndByUnitOfTime(date, 'day');
};

export const getWeekStartAndEnd = date => {
  return getStartAndEndByUnitOfTime(date, 'week');
};

export const getMonthStartAndEnd = date => {
  return getStartAndEndByUnitOfTime(date, 'month');
};

export const getQuarterStartAndEnd = date => {
  return getStartAndEndByUnitOfTime(date, 'quarter');
};

export const getYearStartAndEnd = date => {
  return getStartAndEndByUnitOfTime(date, 'year');
};

export const getStartAndEndByUnitOfTime = (
  date = new Date(),
  unitOfTime = 'week'
) => {
  const day = moment(date);
  return [day.startOf(unitOfTime).toDate(), day.endOf(unitOfTime).toDate()];
};

export const getStartAndEnd = days => {
  return {
    start: R.head()(days).format(),
    end: R.last()(days).format(),
  };
};
