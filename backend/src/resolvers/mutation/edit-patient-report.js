import { prisma } from '@';
import sanitizeHtml from 'sanitize-html';

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
