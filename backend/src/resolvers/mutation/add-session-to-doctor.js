import { prisma } from '@';

const addSessionToDoctor = async (_, { doctorSession }, { organizationId }) => {
  return prisma.doctorSessionDefination.create({
    data: {
      ...doctorSession,
      organizationId,
    },
  });
};

export default addSessionToDoctor;
