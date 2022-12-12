import { prisma } from '@';
export const shortFun = async (model, coment, action, r) => {
  await prisma.logging.create({
    data: {
      model: model,
      text: coment,
      recordId: r.id,
      date: new Date(),
      action: action,
      userId: r.userId,
      organizationId: r.organizationId,
    },
  });
};

export const getRow = async params => {
  let row = {};
  if (params.model === 'Revenue' && params.action === 'update') {
    row = await prisma.revenue.findUnique({
      where: { id: params.args.where.id },
    });
  } else if (params.model === 'Expense' && params.action === 'update') {
    row = await prisma.expense.findUnique({
      where: { id: params.args.where.id },
    });
  } else if (params.model === 'BankRevenue' && params.action === 'update') {
    row = await prisma.bankRevenue.findUnique({
      where: { id: params.args.where.id },
    });
  } else if (params.model === 'BankExpense' && params.action === 'update') {
    row = await prisma.bankExpense.findUnique({
      where: { id: params.args.where.id },
    });
  }
  return row;
};

