import { prisma } from '@';

import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS, POSITION } from '@/utils/constants';

const revenues = async (_, __, { user, organizationId }) => {
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.View_Accounting,
    },
    true
  );
  const condition =
    user.position === POSITION.Admin || user.position === POSITION.Assistant
      ? {
          userId: {
            in: ids,
          },
        }
      : {
          doctorId: {
            in: ids,
          },
        };
  return prisma.revenue.findMany({
    where: {
      OR: [
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
        condition,
      ],
    },
    include: {
      user: true,
      specialty: true,
      branch: true,
      doctor: true,
    },
  });
};

export default revenues;
