import moment from 'moment';

export const getStartOfDay = date =>
  moment(date)
    .startOf('day')
    .toDate();
export const getEndOfDay = date =>
  moment(date)
    .endOf('day')
    .toDate();
