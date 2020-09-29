import { prisma } from '@';
import * as RA from 'ramda-adjunct';

const updateAppointment = (_, { appointment }) => {
  return prisma.appointment.update({
    data: {
      notes: appointment.notes || '',
      data: {
        upsert: appointment.data.map(({ id, value, fieldId }) => ({
          create: {
            value: value,
            field: { connect: { id: fieldId } },
          },
          update: {
            value: value,
            field: { connect: { id: fieldId } },
          },
          where: { id: id || fieldId },
        })),
      },
    },
    where: { id: appointment.id },
  });
};

export default updateAppointment;
