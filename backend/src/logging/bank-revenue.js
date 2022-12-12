import { prisma } from '@';
import { shortFun } from './general';
export const createBankRevenueLogging = async r => {
  const coment = `create bank revenue (${r.name}) to ${r.amount}`;
  shortFun('BankRevenue', coment, 'insert', r);
};
export const updateBankRevenueLogging = async (r, row) => {
  const coment = `change revenue (${r.name}) from ${row.amount} to ${r.amount}`;
  shortFun('BankRevenue', coment, 'update', r);
};
