import { prisma } from '@';
import * as R from 'ramda';

const specialties = ({ id }) => {
  return prisma.userSpecialty
    .findMany({
      where: {
        userId: id,
      },
      include: { specialty: true },
      distinct: ['userId'],
    })
    .then(uSpecialties =>
      uSpecialties.map(({ specialty }) => R.pick(['id', 'name'])(specialty))
    );
};

export default specialties;
