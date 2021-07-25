import { prisma } from '@';

import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';

const bankRevenues = async (_, __, { user, organizationId }) => {
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.ViewBank_Accounting,
    },
    true
  );
  return prisma.bankRevenue.findMany({
    where: {
      organizationId,
      userId: {
        in: ids,
      },
    },
    include: {
      bank: true,
      user:true,
      branch:true,
      specialty:true,
      doctor:true,
    },
  });
};

export default bankRevenues;
