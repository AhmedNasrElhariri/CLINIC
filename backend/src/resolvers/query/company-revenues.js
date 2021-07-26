import { prisma } from '@';

import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';

const CompanyRevenues = async (_, __, { user, organizationId }) => {
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.ViewInsurance_Accounting,
    },
    true
  );
  console.log(ids,'idididdidididiid');
  return prisma.insuranceRevenue.findMany({
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
    include: {
      company: true,
      user: true,
      branch: true,
      specialty: true,
      doctor: true,
    },
  });
};

export default CompanyRevenues;
