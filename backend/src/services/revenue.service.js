import { prisma } from '@';

const getAppointmentprice = (type, clinic) => {
  switch (type) {
    case 'Examination':
      return clinic.examinationPrice;
    case 'Followup':
      return clinic.followupPrice;
    case 'Urgent':
      return clinic.urgentPrice;
  }
};

export const createAppointmentRevenue = async ({ id }) => {
  const appointment = await prisma.appointment.findOne({
    where: { id },
    include: {
      clinic: {
        select: {
          id: true,
          examinationPrice: true,
          followupPrice: true,
          urgentPrice: true,
        },
      },
      patient: {
        select: {
          name: true,
        },
      },
    },
  });

  const { clinic, type, patient } = appointment;

  const revenue = {
    name: type + ' - ' + patient.name,
    date: new Date(),
    amount: getAppointmentprice(type, clinic),
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
