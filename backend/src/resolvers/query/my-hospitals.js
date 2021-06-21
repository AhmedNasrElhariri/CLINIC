import { prisma } from '@';
import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';
const myHospitals = async (_, __, { organizationId, user }) => {
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.List_Hospital,
    },
    true
  );
  return prisma.hospital.findMany({
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

export default myHospitals;
