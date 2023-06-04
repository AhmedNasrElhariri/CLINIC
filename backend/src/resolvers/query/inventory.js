import { prisma } from '@';
import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';
import getAllBranchesIds from '@/services/branches-specialties-users';
import permissionLevel from '@/services/permission-level';

const inventory = async (
  _,
  { doctorId, specialtyId, branchId },
  { organizationId, user }
) => {
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.View_Inventory,
    },
    false
  );
  const IDS = await getAllBranchesIds(ids, organizationId);

  const { isOrganizationLevel } = await permissionLevel(
    ACTIONS.View_Inventory,
    user,
    organizationId
  );
  const condition =
    isOrganizationLevel && !branchId
      ? { organizationId: organizationId }
      : {
          branchId: {
            in: branchId ? [branchId] : IDS.branchesIds,
          },
        };

  return prisma.inventoryItem.findMany({
    where: condition,
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
