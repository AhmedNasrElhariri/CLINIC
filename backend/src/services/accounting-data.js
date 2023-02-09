import { prisma } from '@';

export const revenueAccountingData = async (
  organizationId,
  ids,
  branchId,
  specialtyId,
  doctorId,
  updatedDateFrom,
  updatedDateTo,
  name,
  offset,
  limit,
  bankId
) => {
  const cash = await prisma.revenue.findMany({
    where: {
      organizationId: organizationId,
      AND: [
        {
          OR: [
            {
              doctorId: {
                in: ids,
              },
            },
            {
              branchId: {
                in: ids,
              },
            },
            {
              specialtyId: {
                in: ids,
              },
            },
          ],
        },
        {
          AND: [
            {
              branchId: branchId,
            },
            {
              specialtyId: specialtyId,
            },
            {
              doctorId: doctorId,
            },
          ],
        },
      ],
      date: {
        gte: updatedDateFrom,
        lte: updatedDateTo,
      },
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
    skip: 0,
    take: offset + limit,
  });
  const visa = await prisma.bankRevenue.findMany({
    where: {
      organizationId,
      AND: [
        {
          OR: [
            {
              doctorId: {
                in: ids,
              },
            },
            {
              branchId: {
                in: ids,
              },
            },
            {
              specialtyId: {
                in: ids,
              },
            },
          ],
        },
        {
          AND: [
            {
              branchId: branchId,
            },
            {
              specialtyId: specialtyId,
            },
            {
              doctorId: doctorId,
            },
            {
              bankId: bankId,
            },
            {
              name: {
                contains: name,
                mode: 'insensitive',
              },
            },
          ],
        },
      ],
      date: {
        gte: updatedDateFrom,
        lte: updatedDateTo,
      },
    },
    skip: 0,
    take: offset + limit,
  });
  const totalCash = await prisma.revenue.aggregate({
    _sum: {
      amount: true,
    },
    _count: {
      id: true,
    },
    where: {
      organizationId: organizationId,
      AND: [
        {
          OR: [
            {
              doctorId: {
                in: ids,
              },
            },
            {
              branchId: {
                in: ids,
              },
            },
            {
              specialtyId: {
                in: ids,
              },
            },
          ],
        },
        {
          AND: [
            {
              branchId: branchId,
            },
            {
              specialtyId: specialtyId,
            },
            {
              doctorId: doctorId,
            },
          ],
        },
      ],
      date: {
        gte: updatedDateFrom,
        lte: updatedDateTo,
      },
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
  });
  const totalVisa = await prisma.bankRevenue.aggregate({
    _sum: {
      amount: true,
    },
    _count: {
      id: true,
    },
    where: {
      organizationId,
      AND: [
        {
          OR: [
            {
              doctorId: {
                in: ids,
              },
            },
            {
              branchId: {
                in: ids,
              },
            },
            {
              specialtyId: {
                in: ids,
              },
            },
          ],
        },
        {
          AND: [
            {
              branchId: branchId,
            },
            {
              specialtyId: specialtyId,
            },
            {
              doctorId: doctorId,
            },
            {
              bankId: bankId,
            },
            {
              name: {
                contains: name,
                mode: 'insensitive',
              },
            },
          ],
        },
      ],
      date: {
        gte: updatedDateFrom,
        lte: updatedDateTo,
      },
    },
  });
  return {
    cash: cash,
    visa: visa,
    totalCash: totalCash._sum.amount,
    totalVisa: totalVisa._sum.amount,
    cashCount: totalCash._count.id,
    visaCount: totalVisa._count.id,
  };
};

export const expenseAccountingData = async (
  organizationId,
  ids,
  branchId,
  specialtyId,
  doctorId,
  updatedDateFrom,
  updatedDateTo,
  name,
  offset,
  limit,
  bankId
) => {
  const cash = await prisma.expense.findMany({
    where: {
      organizationId: organizationId,
      AND: [
        {
          OR: [
            {
              doctorId: {
                in: ids,
              },
            },
            {
              branchId: {
                in: ids,
              },
            },
            {
              specialtyId: {
                in: ids,
              },
            },
          ],
        },
        {
          AND: [
            {
              branchId: branchId,
            },
            {
              specialtyId: specialtyId,
            },
            {
              doctorId: doctorId,
            },
          ],
        },
      ],
      date: {
        gte: updatedDateFrom,
        lte: updatedDateTo,
      },
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
    skip: 0,
    take: offset + limit,
  });
  const visa = await prisma.bankExpense.findMany({
    where: {
      organizationId,
      AND: [
        {
          OR: [
            {
              doctorId: {
                in: ids,
              },
            },
            {
              branchId: {
                in: ids,
              },
            },
            {
              specialtyId: {
                in: ids,
              },
            },
          ],
        },
        {
          AND: [
            {
              branchId: branchId,
            },
            {
              specialtyId: specialtyId,
            },
            {
              doctorId: doctorId,
            },
            {
              bankId: bankId,
            },
          ],
        },
      ],
      date: {
        gte: updatedDateFrom,
        lte: updatedDateTo,
      },
    },
    skip: 0,
    take: offset + limit,
  });
  const totalCash = await prisma.expense.aggregate({
    _sum: {
      amount: true,
    },
    _count: {
      id: true,
    },
    where: {
      organizationId: organizationId,
      AND: [
        {
          OR: [
            {
              doctorId: {
                in: ids,
              },
            },
            {
              branchId: {
                in: ids,
              },
            },
            {
              specialtyId: {
                in: ids,
              },
            },
          ],
        },
        {
          AND: [
            {
              branchId: branchId,
            },
            {
              specialtyId: specialtyId,
            },
            {
              doctorId: doctorId,
            },
          ],
        },
      ],
      date: {
        gte: updatedDateFrom,
        lte: updatedDateTo,
      },

      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
  });
  const totalVisa = await prisma.bankExpense.aggregate({
    _sum: {
      amount: true,
    },
    _count: {
      id: true,
    },
    where: {
      organizationId,
      AND: [
        {
          OR: [
            {
              doctorId: {
                in: ids,
              },
            },
            {
              branchId: {
                in: ids,
              },
            },
            {
              specialtyId: {
                in: ids,
              },
            },
          ],
        },
        {
          AND: [
            {
              branchId: branchId,
            },
            {
              specialtyId: specialtyId,
            },
            {
              doctorId: doctorId,
            },
            {
              bankId: bankId,
            },
          ],
        },
      ],
      date: {
        gte: updatedDateFrom,
        lte: updatedDateTo,
      },
    },
  });
  return {
    cash: cash,
    visa: visa,
    totalCash: totalCash._sum.amount,
    totalVisa: totalVisa._sum.amount,
    cashCount: totalCash._count.id,
    visaCount: totalVisa._count.id,
  };
};
