import { prisma } from '@';
import * as R from 'ramda';
const listSpecialties = async (_, __, { organizationId }) => {
  const specialties = await prisma.specialty.findMany({
    where: {
      organizationId,
    },
    include: {
      branches: true,
      userSpecialties: {
        include: {
          user: true,
        },
      },
    },
  });
  const updatedSpecialties = specialties.map(s => {
    const { userSpecialties } = s;
    const doctors = userSpecialties.map(({ user }) =>
      R.pick(['id', 'name'])(user)
    );
    return { ...s, doctors: doctors };
  });
  return updatedSpecialties;
};

export default listSpecialties;
