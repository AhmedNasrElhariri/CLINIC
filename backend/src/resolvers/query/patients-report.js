import { prisma } from '@';

const patientsReport = async (
  _,
  { area, reference },
  { user, organizationId }
) => {
  const patientsAreaCount = await prisma.patient.count({
    where: {
      area,
      organizationId,
    },
  });
  const patients = await prisma.patient.findMany({
    where: {
      organizationId,
    },
  });
  const newPatients = patients.filter(p => p.reference.includes(reference));
  const data = {
    patientsAreaCount: patientsAreaCount || 0,
    patientsReferenceCount: newPatients.length || 0,
  };
  return data;
};

export default patientsReport;
