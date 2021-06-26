import { prisma } from '@';
import { ACTIONS } from '@/utils/constants';
import { listFlattenUsersTreeIds } from '@/services/permission.service';
const myPrice = async (_, __, { user, organizationId }) => {
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.List_Price,
    },true
  );
  return prisma.price.findMany({
    where: {
      userId: {
        in: ids,
      },
    },
    include: {
      user: true,
      branch: true,
      specialty: true,
    },
  });
};

export default myPrice;
