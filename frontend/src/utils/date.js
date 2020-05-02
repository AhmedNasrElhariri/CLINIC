import moment from 'moment';

export const formatDate = (date, format = 'DD MMMM YYYY') =>
  moment(date).format(format);
