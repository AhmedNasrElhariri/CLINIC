import moment from 'moment';
import { ACCOUNTING_VIEWS } from '@/utils/constants';
export const STANDARD_DATE_FORMAT = 'DD-MM-YYYY';
export const FULL_DATE_FORMAT = 'DD-MM-YYYY hh:mm a';
export const TIME_FORMAT = 'hh:mm';

export const formatDate = (date, format) => moment(date).format(format);

export const formatDateFull = date => moment(date).format(FULL_DATE_FORMAT);
export const formatDateStandard = date =>
  moment(date).format(STANDARD_DATE_FORMAT);

export const getStartOfDay = date => moment(date).startOf('day').toDate();
export const getEndOfDay = date => moment(date).endOf('day').toDate();

export const getDateFromAndDateToFromView = view => {
  let DateFrom = new Date();
  let DateTo = new Date();
  switch (view) {
    case ACCOUNTING_VIEWS.YEAR:
      DateFrom = moment().startOf('year').toDate();
      DateTo = moment().endOf('year').toDate();
      break;
    case ACCOUNTING_VIEWS.QUARTER:
      DateFrom = moment().startOf('quarter').toDate();
      DateTo = moment().endOf('quarter').toDate();
      break;
    case ACCOUNTING_VIEWS.MONTH:
      DateFrom = moment().startOf('month').toDate();
      DateTo = moment().endOf('month').toDate();
      break;
    case ACCOUNTING_VIEWS.WEEK:
      DateFrom = moment().startOf('week').toDate();
      DateTo = moment().endOf('week').toDate();
      break;
    default:
      DateFrom = moment().startOf('day').toDate();
      DateTo = moment().endOf('day').toDate();
      break;
  }
  return [DateFrom, DateTo];
};
