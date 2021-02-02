import { prisma } from '@';

const myPatientReports = (_, __, { userId }) => {
  return prisma.patientReport.findMany({
    where: {
      userId,
    },
  });
};

export default myPatientReports;
