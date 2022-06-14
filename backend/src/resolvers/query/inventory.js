import { prisma } from '@';
import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';

const inventory = async (_, __, { organizationId, user }) => {
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.View_Inventory,
    },
    false
  );
  return prisma.inventoryItem.findMany({
    where: {
      organizationId,
      OR: [
        {
          doctorId: {
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
      branch: true,
      specialty: true,
      item: true,
      doctor: true,
    },
  });
};

export default inventory;
