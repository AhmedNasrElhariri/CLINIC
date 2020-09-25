import { prisma } from '@';

const getAppointmentprice = (type, clinic) => {
  const mapVsPrice = {
    Examination: clinic.examinationPrice,
    Followup: clinic.followupPrice,
    Urgent: clinic.urgentPrice,
  };

  return mapVsPrice[type] || 0;
};

const getAppointmentName = (type, clinic) => {
  const shortcuts = {
    Examination: 'E',
    Followup: 'F',
    Urgent: 'U',
  };
  return shortcuts[type];
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
    name: getAppointmentName(type) + ' - ' + patient.name,
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
