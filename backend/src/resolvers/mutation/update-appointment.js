import { prisma } from '@';
import { LAB_STATUS, APPOINTMENTS_STATUS } from '@/utils/constants';
import * as R from 'ramda';

const updateAppointment = async (_, { appointment }, { userId }) => {
  const persistedAppointment = await prisma.appointment.findUnique({
    where: { id: appointment.id },
    include: { patient: true, pictures: true },
  });

  return prisma.appointment.update({
    data: {
      notes: appointment.notes || '',
      pulses: appointment.pulses || null,
      powerOne: appointment.powerOne || null,
      powerTwo: appointment.powerTwo || null,
      sessionsPulses: appointment.sessionsPulses || '[]',
      updaterId: userId,
      data: {
        upsert: appointment.data.map(({ id, value, fieldId }) => ({
          create: {
            value,
            field: { connect: { id: fieldId } },
          },
          update: {
            value,
            field: { connect: { id: fieldId } },
          },
          where: { id: id || fieldId },
        })),
      },
      pictures: {
        deleteMany: {},
        create: appointment.pictures.map(({ id, comment }) => ({
          comment,
          file: {
            connect: {
              id,
            },
          },
        })),
      },
      prescription: {
        deleteMany: {},
        create: appointment.prescription.map(({ dose, medicineId }) => ({
          dose,
          medicine: {
            connect: {
              id: medicineId,
            },
          },
        })),
      },
      labs: {
        deleteMany: {},
        create: appointment.labIds.map(id => ({
          status: LAB_STATUS.DRAFT,
          patient: {
            connect: {
              id: persistedAppointment.patient.id,
            },
          },
          labDefinition: {
            connect: {
              id,
            },
          },
        })),
      },
      images: {
        deleteMany: {},
        create: appointment.imageIds.map(id => ({
          status: LAB_STATUS.DRAFT,
          patient: {
            connect: {
              id: persistedAppointment.patient.id,
            },
          },
          imageDefinition: {
            connect: {
              id,
            },
          },
        })),
      },
    },
    where: { id: appointment.id },
  });
};

export default updateAppointment;
