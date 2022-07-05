import { prisma } from '@';
import { areas } from '@/services/areas';
const patientsReport = async (
  _,
  { area, reference },
  { user, organizationId }
) => {
  const theArea = areas.find(
    a => a.city_name_ar === area || a.city_name_en === area
  );
  const patients = await prisma.patient.findMany({
    where: {
      organizationId,
    },
  });
  const newPatients = patients.filter(p => p.reference.includes(reference));
  const patientsArea = patients.filter(
    p => p.area === theArea.city_name_en || p.area === theArea.city_name_ar
  );
  const data = {
    patientsAreaCount: patientsArea.length || 0,
    patientsReferenceCount: newPatients.length || 0,
  };
  return data;
};

export default patientsReport;
