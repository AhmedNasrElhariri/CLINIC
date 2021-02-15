import { prisma } from '@';

import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';

const expenses = async (_, __, { userId, organizationId }) => {
  const ids = await listFlattenUsersTreeIds(
    {
      userId,
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
  });
};

export default expenses;
