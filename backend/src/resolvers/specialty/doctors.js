import { prisma } from '@';
import * as R from 'ramda';

const doctors = async ({ id }) => {
  return prisma.userSpecialty
    .findMany({
      where: {
        specialtyId: id,
      },
      include: { user: true },
      distinct: ['userId'],
    })
    .then(uSpecialties =>
      uSpecialties.map(({ user }) => R.pick(['id', 'name'])(user))
    );
};

export default doctors;
