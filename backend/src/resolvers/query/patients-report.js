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
  const patients = await prisma.patient.findMany({});
  const newPatients = patients.filter(p => p.reference.includes(reference));
  const data = {
    patientsAreaCount: patientsAreaCount || 0,
    patientsReferenceCount: newPatients.length || 0,
  };
  return data;
};

export default patientsReport;
