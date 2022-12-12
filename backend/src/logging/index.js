import { prisma } from '@';
import {
  createRevenueLogging,
  updateRevenueLogging,
  createManyRevenueLogging,
} from './revenue';
import { createExpenseLogging, updateExpenseLogging } from './expense';
import {
  createBankRevenueLogging,
  updateBankRevenueLogging,
} from './bank-revenue';
import {
  createBankExpenseLogging,
  updateBankExpenseLogging,
} from './bank-expense';

import { getRow, getManyCreate } from './general';
const logg = [
  { action: 'create', model: 'Revenue', handler: createRevenueLogging },
  { action: 'update', model: 'Revenue', handler: updateRevenueLogging },
  // { action: 'createMany', model: 'Revenue', handler: createManyRevenueLogging },
  { action: 'create', model: 'Expense', handler: createExpenseLogging },
  { action: 'update', model: 'Expense', handler: updateExpenseLogging },
  { action: 'create', model: 'BankRevenue', handler: createBankRevenueLogging },
  { action: 'update', model: 'BankRevenue', handler: updateBankRevenueLogging },
  { action: 'create', model: 'BankExpense', handler: createBankExpenseLogging },
  { action: 'update', model: 'BankExpense', handler: updateBankExpenseLogging },
];
const middlewares = async () => {
  prisma.$use(async (params, next) => {
    const rs = next(params);
    const action = params.action;
    const model = params.model;
    const runningMiddlewares = logg.filter(
      l => l.model === model && l.action === action
    );
    
    if (runningMiddlewares.length > 0) {
      const oneMiddleWare = runningMiddlewares[0];
      const row = await getRow(params);
      rs.then(r => {
        oneMiddleWare.handler(r, row);
      }).catch(err => console.log(err));
    }

    return rs;
  });
};
export default middlewares;
