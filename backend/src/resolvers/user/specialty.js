import { prisma } from '@';
import * as R from 'ramda';

const specialty = ({ id }) => {
  return prisma.userSpecialty
    .findMany({
      where: {
        userId: id,
      },
      include: { specialty: true },
      distinct: ['userId'],
    })
    .then(uSpecialties =>
      uSpecialties.length
        ? R.pipe(R.prop('specialty'), R.pick(['id', 'name']))(uSpecialties[0])
        : null
    );
};

export default specialty;
