import { prisma } from '@';
import { shortFun } from './general';
export const createExpenseLogging = async (r,row = {}, tag) => {
  const coment = `create expense (${r.name}) to ${r.amount}`;
  shortFun('Expense', coment, 'insert', r, tag);
};
export const updateExpenseLogging = async (r, row, tag) => {
  const coment = `change expense (${r.name}) from ${row.amount} to ${r.amount}`;
  shortFun('Expense', coment, 'update', r, tag);
};
