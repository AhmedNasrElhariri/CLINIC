import { prisma } from '@';

import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';

const patients = async (
  _,
  { offset, limit, name, phoneNo },
  { user, organizationId }
) => {
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.View_Patient,
    },
    true
  );
  const patientsCount = await prisma.patient.count({
    where: {
      userId: {
        in: ids,
      },
      name: {
        contains: name,
      },
      phoneNo: {
        contains: phoneNo,
      },
    },
  });
  const patients = await prisma.patient.findMany({
    where: {
      userId: {
        in: ids,
      },
      name: {
        contains: name,
      },
      phoneNo: {
        contains: phoneNo,
      },
    },
    skip: offset,
    take: limit,
  });
  const data = { patients: patients, patientsCount: patientsCount };
  return data;
};

export default patients;
