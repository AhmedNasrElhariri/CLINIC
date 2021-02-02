import { prisma } from '@';

const editPatientReport = async (_, { patientReport }) => {
  sanitizeHtml(patientReport.body);
  const { id, ...rest } = patientReport;
  return prisma.patientReport.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editPatientReport;
