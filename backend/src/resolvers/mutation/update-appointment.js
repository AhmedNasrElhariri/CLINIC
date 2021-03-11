import { prisma } from '@';
import { LAB_STATUS } from '@/utils/constants';

const updateAppointment = async (_, { appointment }) => {
  const persistedAppointment = await prisma.appointment.findOne({
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
      collections: {
        upsert: appointment.collections.map(({ id, caption, images }) => ({
          create: {
            caption,
            images: {
              connect: images.map(({ id }) => ({ id })),
            },
          },
          update: {
            caption,
            images: {
              connect: images.map(({ id }) => ({ id })),
              updateMany: images.map(i => ({
                where: { id: i.id },
                data: {
                  comment: i.comment,
                },
              })),
            },
          },
          where: { id: id || appointment.id },
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
