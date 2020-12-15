import { prisma } from '@';

export const createInventoryExpense = async ({ name, price, clinicId }) => {
  return prisma.expense.create({
    data: {
      name,
      amount: price,
      date: new Date(),
      clinic: {
        connect: {
          id: clinicId,
        },
      },
    },
  });
};

export const createAppointmentExpense = async (id, amount) => {
  const appointment = await prisma.appointment.findOne({
    where: { id },
    include: {
      clinic: {
        select: {
          id: true,
        },
      },
    },
  });

  const { clinic } = appointment;

  return prisma.expense.create({
    data: {
      date: new Date(),
      name: 'Session Discount',
      amount,
      clinic: {
        connect: {
          id: clinic.id,
        },
      },
    },
  });
};
