import { prisma } from '@';
import * as RA from 'ramda-adjunct';

const updateAppointment = (_, { id, appointment }) => {
  return prisma.appointment.update({
    data: RA.spreadProp('vitalData', {
      ...appointment,
    }),
    where: { id },
  });
};

export default updateAppointment;
