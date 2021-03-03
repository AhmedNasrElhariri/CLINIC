import { prisma } from '@';

const updateAppointment = (_, { appointment }) => {
  return prisma.appointment.update({
    data: {
      notes: appointment.notes || '',
      // prescription: appointment.prescription || '',
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
    },
    where: { id: appointment.id },
  });
};

export default updateAppointment;
