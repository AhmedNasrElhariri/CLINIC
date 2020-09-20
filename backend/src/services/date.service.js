import moment from 'moment';

export const STANDARD_DATE_FORMAT = 'DD-MM-YYYY';
export const FULL_DATE_FORMAT = 'DD-MM-YYYY hh:mm a';

export const formatDate = (date, format) => moment(date).format(format);

export const formatDateFull = date => moment(date).format(FULL_DATE_FORMAT);

export const getStartOfDay = date => moment(date).startOf('day').toDate();
export const getEndOfDay = date => moment(date).endOf('day').toDate();
