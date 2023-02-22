import { shortFun } from './general';
export const createBankExpenseLogging = async (r, __, tag) => {
  console.log('indidnd-ooo')
  const coment = `create bank expense (${r.name}) to ${r.amount}`;
  shortFun('BankExpense', coment, 'insert', r, tag);
};
export const updateBankExpenseLogging = async (r, row, tag) => {
  const coment = `edit bank expense (${r.name}) from ${row.amount} to ${r.amount}`;
  shortFun('BankExpense', coment, 'update', r, tag);
};
