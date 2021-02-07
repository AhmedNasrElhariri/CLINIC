import moment from 'moment';

import { ACCOUNTING_VIEWS as VIEWS } from './constants';

const granularity = {
  [VIEWS.DAY]: 'day',
  [VIEWS.WEEK]: 'week',
  [VIEWS.MONTH]: 'month',
  [VIEWS.QUARTER]: 'quarter',
  [VIEWS.YEAR]: 'year',
};

const filterByView = (data, { view } = {}) => {
  return data.filter(i => moment(i.date).isSame(moment(), granularity[view]));
};

const filterByPeriod = (data, { period: [start, end] }) => {
  return data.filter(i => moment(i.date).isBetween(start, end, 'days', '[]'));
};

export const filterAccountingList = (data, view, period) => {
  const filters = period && period.length ? [filterByPeriod] : [filterByView];
  return filters.reduce((result, fn) => fn(result, { view, period }), data);
};
