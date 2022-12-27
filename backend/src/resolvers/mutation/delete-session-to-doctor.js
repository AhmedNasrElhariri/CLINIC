import { prisma } from '@';

const deleteSessionToDoctor = async (_, { sessionId }) => {
  return prisma.doctorSessionDefination.delete({
    where: {
      id: sessionId,
    },
  });
};

export default deleteSessionToDoctor;
