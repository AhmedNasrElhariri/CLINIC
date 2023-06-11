import { prisma } from '@';
import { getEndOfDay, getStartOfDay } from '@/services/date.service';

const patientNotes = (_, { input }, { organizationId }) => {
  const { patientId, dateFrom, dateTo } = input;
  console.log(dateFrom, 'dATEFrom', dateTo, 'dateTo');
  return prisma.patientNotes.findMany({
    where: Object.assign(
      {
        organizationId,
        patientId,
      },
      dateFrom && {
        createdAt: {
          gte: getStartOfDay(dateFrom),
          lte: getEndOfDay(dateTo),
        },
      }
    ),
    include: { appointment: true },
  });
};

export default patientNotes;
