import { prisma } from '@';
import { shortFun } from './general';
export const createBankExpenseLogging = async (r, row = {},tag) => {
  const coment = `create bank expense (${r.name}) to ${r.amount}`;
  shortFun('BankExpense', coment, 'insert', r, tag);
};
export const updateBankExpenseLogging = async (r, row, tag) => {
  const coment = `change bank expense (${r.name}) from ${row.amount} to ${r.amount}`;
  shortFun('BankExpense', coment, 'update', r, tag);
};
