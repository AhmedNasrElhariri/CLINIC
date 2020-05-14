import { prisma } from '@';
import * as R from 'ramda';

const appointments = (_, { input }) => {
  return prisma.appointment.findMany({
    where: {
      date: {
        gte: R.prop('fromDate')(input),
        lte: R.prop('toDate')(input),
      },
    },
  });
};

export default appointments;
