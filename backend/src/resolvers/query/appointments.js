import { prisma } from '@';
import * as R from 'ramda';

const appointments = async (_, { input }, { userId }) => {
  let { clinicIds } = input;

  if (!clinicIds.length) {
    clinicIds = await prisma.clinic
      .findMany({
        where: { users: { some: { id: userId } } },
        select: { id: true },
      })
      .then(clinics => clinics.map(({ id }) => id));
  }

  return prisma.appointment.findMany({
    where: {
      date: {
        gte: R.prop('fromDate')(input),
        lte: R.prop('toDate')(input),
      },
      clinicId: { in: clinicIds },
    },
  });
};

export default appointments;
