import { prisma } from '@';

import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';

const patientsReport = async (
  _,
  { area, reference },
  { user, organizationId }
) => {
  const patientsAreaCount = await prisma.patient.count({
    where: {
      area,
    },
  });
//   const patientsReferenceCount = await prisma.patient.count({
//     where: {
//       reference: {
       
//       },
//     },
//   });
  const data = {
    patientsAreaCount: patientsAreaCount || 0,
    patientsReferenceCount: 0,
  };
  return data;
};

export default patientsReport;
