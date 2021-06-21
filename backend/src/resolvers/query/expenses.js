import { prisma } from '@';

import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';

const expenses = async (_, __, { user, organizationId }) => {
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.View_Accounting,
    },
    true
  );

  return prisma.expense.findMany({
    where: {
      userId: {
        in: ids,
      },
    },
    include: {
      user: true,
      specialty: true,
      branch: true,
    },
  });
};

export default expenses;
