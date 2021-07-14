import { prisma } from '@';

export const createInventoryExpense = async ({
  name,
  price,
  userId,
  organizationId,
}) => {
  return prisma.expense.create({
    data: {
      name,
      amount: price,
      expenseType: 'InventoryExpense',
      date: new Date(),
      user: {
        connect: {
          id: userId,
        },
      },
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export const createAppointmentExpense = async (
  userId,
  discount,
  organizationId,
  branchId,
  specialtyId,
  userID,
  level
) => {
  return prisma.expense.create({
    data: Object.assign(
      {
        date: new Date(),
        name: discount.name,
        expenseType: 'Dicount',
        amount: discount.amount,
        level,
        organization: {
          connect: {
            id: organizationId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      specialtyId && {
        specialty: {
          connect: {
            id: specialtyId,
          },
        },
      },
      branchId && {
        branch: {
          connect: {
            id: branchId,
          },
        },
      },
      userID && {
        doctor: {
          connect: {
            id: userID,
          },
        },
      }
    ),
  });
};
