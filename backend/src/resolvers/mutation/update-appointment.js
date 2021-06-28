import { prisma } from '@';
import { LAB_STATUS } from '@/utils/constants';

const updateAppointment = async (_, { appointment }) => {
  const persistedAppointment = await prisma.appointment.findUnique({
    where: { id: appointment.id },
    include: { patient: true },
  });
  return prisma.appointment.update({
    data: {
      notes: appointment.notes || '',
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
        create: appointment.prescription.map(
          ({ dose, duration, period, medicineId, timingId }) => ({
            dose,
            duration,
            period,
            medicine: {
              connect: {
                id: medicineId,
              },
            },
            timing: {
              connect: {
                id: timingId,
              },
            },
          })
        ),
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
