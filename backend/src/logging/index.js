import { prisma } from '@';
import { createRevenueLogging, updateRevenueLogging } from './revenue';
import { createExpenseLogging, updateExpenseLogging } from './expense';
import {
  createBankRevenueLogging,
  updateBankRevenueLogging,
} from './bank-revenue';
import {
  createBankExpenseLogging,
  updateBankExpenseLogging,
} from './bank-expense';

import { getRow } from './general';
const logg = [
  { action: 'create', model: 'Revenue', handler: createRevenueLogging },
  { action: 'update', model: 'Revenue', handler: updateRevenueLogging },
  { action: 'create', model: 'Expense', handler: createExpenseLogging },
  { action: 'update', model: 'Expense', handler: updateExpenseLogging },
  { action: 'create', model: 'BankRevenue', handler: createBankRevenueLogging },
  { action: 'update', model: 'BankRevenue', handler: updateBankRevenueLogging },
  { action: 'create', model: 'BankExpense', handler: createBankExpenseLogging },
  { action: 'update', model: 'BankExpense', handler: updateBankExpenseLogging },
];
const middlewares = async () => {
  prisma.$use(async (params, next) => {
    const { args } = params;
    const { tag, ...rest } = args;
    const newParams = { ...params, args: rest };
    const rs = next(newParams);
    const action = newParams.action;
    const model = newParams.model;
    const runningMiddlewares = logg.filter(
      l => l.model === model && l.action === action
    );
    if (runningMiddlewares.length > 0) {
      const oneMiddleWare = runningMiddlewares[0];
      const row = await getRow(newParams);
      rs.then(r => {
        oneMiddleWare.handler(r, row, tag);
      }).catch(err => console.log(err));
    }

    return rs;
  });
};
export default middlewares;
