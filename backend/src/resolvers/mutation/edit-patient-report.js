import { prisma } from '@';
import sanitizeHtml from 'sanitize-html';

const editPatientReport = async (_, { patientReport, type }) => {
  sanitizeHtml(patientReport.body);
  const { id, ...rest } = patientReport;
  if (type === 'edit') {
    return prisma.patientReport.update({
      data: rest,
      where: {
        id,
      },
    });
  } else {
    return prisma.patientReport.delete({
      where: {
        id: id,
      },
    });
  }
};

export default editPatientReport;
