import { prisma } from '@';
export const createAppointmentRevenue = async ({ id }) => {
  const appointment = await prisma.appointment.findOne({
    where: { id },
    include: {
      clinic: {
        select: {
          id: true,
          examinationPrice: true,
          followupPrice: true,
        },
      },
    },
  });

  const { clinic, type } = appointment;

  const revenue = {
    name: type,
    date: new Date(),
    amount:
      type === 'Examination' ? clinic.examinationPrice : clinic.followupPrice,
  };

  return prisma.revenue.create({
    data: {
      clinic: {
        connect: {
          id: clinic.id,
        },
      },
      ...revenue,
    },
  });
};
