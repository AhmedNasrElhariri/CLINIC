import { prisma } from '@';
import { shortFun } from './general';
export const createBankRevenueLogging = async (r,row = {}, tag) => {
  const coment = `create bank revenue (${r.name}) to ${r.amount}`;
  shortFun('BankRevenue', coment, 'insert', r, tag);
};
export const updateBankRevenueLogging = async (r, row, tag) => {
  const coment = `change revenue (${r.name}) from ${row.amount} to ${r.amount}`;
  shortFun('BankRevenue', coment, 'update', r, tag);
};
