import { prisma } from '@';
import * as R from 'ramda';

const specialty = ({ id }) => {
  return prisma.userSpecialty
    .findMany({
      where: {
        userId: id,
      },
      include: { specialty: true },
      // distinct: ['userId'],
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

      // console.log(specialties,'spepepepep');
      // uSpecialties.length
      //   ? R.pipe(R.prop('specialty'), R.pick(['id', 'name']))(uSpecialties)
      //   : null
      return specialties;
    });
};

export default specialty;
