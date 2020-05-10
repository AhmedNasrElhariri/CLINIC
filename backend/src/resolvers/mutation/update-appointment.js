import { prisma } from '@';
import * as RA from 'ramda-adjunct';

const updateAppointment = (_, { appointment }) => {
  return prisma.appointment.update({
    data: {
      data: {
        upsert: appointment.data.map(fieldData => ({
          create: {
            value: fieldData.value,
            field: { connect: { id: fieldData.fieldId } },
          },
          update: {
            value: fieldData.value,
            field: { connect: { id: fieldData.fieldId } },
          },
          where: { id: fieldData.id },
        })),
      },
    },
    where: { id: appointment.id },
  });
};

export default updateAppointment;
