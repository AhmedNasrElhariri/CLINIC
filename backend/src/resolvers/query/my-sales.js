import { prisma } from '@';
import { ACTIONS } from '@/utils/constants';
import { listFlattenUsersTreeIds } from '@/services/permission.service';
const mySaleses = async(_, __, { user, organizationId }) => {
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.View_Sales,
    },true
  );
  return prisma.sales.findMany({
    where: {
      userId: {
        in: ids,
      },
    },
    include: {
      salesDefinition: true,
      user: true,
    },
  });
};

export default mySaleses;
