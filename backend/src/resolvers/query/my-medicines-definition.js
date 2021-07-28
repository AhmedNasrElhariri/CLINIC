import { prisma } from '@';
import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';

const myMedicinesDefinition = async(_, __, { user, organizationId , userId }) => {
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.View_Medicine,
    },
    true
  );
  return prisma.medicineDefinition.findMany({
    where: {
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
  });
};

export default myMedicinesDefinition;
