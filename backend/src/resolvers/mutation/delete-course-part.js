import { prisma } from '@';

const deleteCoursePartToDoctor = async (_, { partId }) => {
  return prisma.doctorCoursePartDefination.delete({
    where: {
      id: partId,
    },
  });
};

export default deleteCoursePartToDoctor;
