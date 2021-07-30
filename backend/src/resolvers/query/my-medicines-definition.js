import { prisma } from '@';
import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS, POSITION } from '@/utils/constants';

const myMedicinesDefinition = async (
  _,
  __,
  { user, organizationId, userId }
) => {
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.View_Medicine,
    },
    false
  );
  return prisma.medicineDefinition.findMany({
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
        {
          userId: {
            in: ids,
          },
        },
        {
          doctorId: {
            in: ids,
          },
        },
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

export default myMedicinesDefinition;
