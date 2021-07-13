import { prisma } from '@';

import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';

const patients = async (_, { name }, { user, organizationId }) => {
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.View_Patient,
    },
    true
  );
  return prisma.patient.findMany({
    where: {
      userId: {
        in: ids,
      },
      OR: [
        {
          phoneNo: {
            contains: name,
          },
        },
        {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
      ],
    },
    skip: 0,
    take: 100,
  });
};

export default patients;
