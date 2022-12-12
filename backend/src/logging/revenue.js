import { prisma } from '@';
import { shortFun } from './general';

export const createRevenueLogging = async r => {
  const coment = `create revenue (${r.name}) to ${r.amount}`;
  shortFun('Revenue', coment, 'insert', r);
};
export const updateRevenueLogging = async (r, row) => {
  const coment = `change revenue (${r.name}) from ${row.amount} to ${r.amount}`;
  shortFun('Revenue', coment, 'update', r);
};

