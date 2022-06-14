import { prisma } from '@';
import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';

const mySurgeries = async (_, __, { organizationId, user }) => {
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.Create_Surgery,
    },
    false
  );
  return prisma.surgery.findMany({
    where: {
      organizationId,
      OR: [
        {
          userId: {
            in: ids,
          },
        },
        {
          branchId: {
            in: ids,
          },
        },
        {
          specialtyId: {
            in: ids,
          },
        },
      ],
    },
    include: {
      user: true,
      specialty: true,
      branch: true,
    },
  });
};

export default mySurgeries;
