import { prisma } from '@';
import * as R from 'ramda';

export const convertArrayToInClause = (obj = {}) => {
  const inClauses = R.pipe(
    R.filter(R.pipe(R.map(R.partialRight(R.prop, [obj])), R.is(Array))),
    R.map(prop => R.objOf(R.dropLast(1, prop) + '_in')(obj[prop])),
    R.mergeAll
  )(Object.keys(obj));

  return inClauses;
};

export const fetchWithCount = async (model, { where, ...rest }) => {
  const dataQuery = prisma[model].findMany({ where, ...rest });
  const dataCountQuery = prisma[model].count({ where });
  return Promise.all([dataQuery, dataCountQuery]);
};
