import { prisma } from '@';
import sanitizeHtml from 'sanitize-html';

const addPatientReport = async (_, { patientReport }, { userId }) => {
  sanitizeHtml(patientReport.body);
  return prisma.patientReport.create({
    data: {
      ...patientReport,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export default addPatientReport;
