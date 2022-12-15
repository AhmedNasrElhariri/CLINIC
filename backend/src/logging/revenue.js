import { prisma } from '@';
import { shortFun } from './general';

export const createRevenueLogging = async (r, row = {}, tag) => {
  const coment = `create revenue (${r.name}) to ${r.amount}`;
  shortFun('Revenue', coment, 'insert', r, tag);
};
export const updateRevenueLogging = async (r, row, tag) => {
  const coment = `change revenue (${r.name}) from ${row.amount} to ${r.amount}`;
  shortFun('Revenue', coment, 'update', r, tag);
};
