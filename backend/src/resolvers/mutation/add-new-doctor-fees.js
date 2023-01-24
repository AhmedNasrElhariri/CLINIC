import { prisma } from '@';

const addNewwDoctorFees = async (
  _,
  { doctorFees },
  { organizationId, userId }
) => {
  const { sessionId, sessionName,name, ...rest } = doctorFees;
  return prisma.doctorFees.create({
    data: {
      name: sessionName + ' - ' + name,
      sessionId: sessionId,
      ...rest,
      userId,
      organizationId,
    },
  });
};

export default addNewwDoctorFees;
