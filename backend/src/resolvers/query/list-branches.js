import { prisma } from '@';
import * as R from 'ramda';
const listBranches = async (_, __, { organizationId }) => {
  const branches = await prisma.branch.findMany({
    where: {
      organizationId,
    },
    include: {
      specialties: {
        include: {
          userSpecialties: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });
  const updatedBranches = branches.map(b => {
    const { specialties } = b;
    const returnedSpecialties = specialties.map(s => {
      const { userSpecialties } = s;
      const doctors = userSpecialties.map(({ user }) =>
        R.pick(['id', 'name'])(user)
      );
      return { ...s, doctors: doctors };
    });
    return { ...b, specialties: returnedSpecialties };
  });
  return updatedBranches;
};

export default listBranches;
