import { prisma } from '@';
import { getStartOfDay, getEndOfDay } from '@/services/date.service';
const myPatientSurgeries = async (
  _,
  { offset, limit, dateFrom, dateTo, patientId, surgery, hospital },
  { organizationId }
) => {
  const startDay = getStartOfDay(dateFrom);
  const endDay = getEndOfDay(dateTo);
  const surgeries = await prisma.patientSurgery.findMany({
    where: {
      OR: [
        { patientId },
        { surgeryId: surgery },
        { hospitalId: hospital },
        {
          date: {
            gte: startDay,
            lte: endDay,
          },
        },
      ],
      organizationId,
    },
    skip: offset,
    take: limit,
  });
  const surgeriesCount = await prisma.patientSurgery.count({
    where: {
      OR: [
        { patientId },
        { surgeryId: surgery },
        { hospitalId: hospital },
        {
          date: {
            gte: startDay,
            lte: endDay,
          },
        },
      ],
      organizationId,
    },
  });
  const data = { surgeries: surgeries, surgeriesCount: surgeriesCount };
  return data;
};

export default myPatientSurgeries;
