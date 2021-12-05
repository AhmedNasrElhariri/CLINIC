import { prisma } from '@';
import * as R from 'ramda';

const specialty = ({ id }) => {
  return prisma.userSpecialty
    .findMany({
      where: {
        userId: id,
      },
      include: { specialty: true },
    })
    .then(uSpecialties => {
      const specialties = [];
      for (let index = 0; index < uSpecialties.length; index++) {
        const spe = R.pipe(
          R.prop('specialty'),
          R.pick(['id', 'name'])
        )(uSpecialties[index]);
        specialties.push(spe);
      }
      return specialties;
    });
};

export default specialty;
