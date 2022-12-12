import { prisma } from '@';
import { shortFun } from './general';
export const createExpenseLogging = async r => {
  const coment = `create expense (${r.name}) to ${r.amount}`;
  shortFun('Expense', coment, 'insert', r);
};
export const updateExpenseLogging = async (r, row) => {
  const coment = `change expense (${r.name}) from ${row.amount} to ${r.amount}`;
  shortFun('Expense', coment, 'update', r);
};
