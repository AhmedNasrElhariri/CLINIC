import { prisma } from '@';

const addCourse = async (_, { course }, { userId }) => {
  const { patientId, courseDefinitionId, ...rest } = course;
  return prisma.course.create({
    data: {
      ...rest,
      user: {
        connect: {
          id: userId,
        },
      },
      doctor: {
        connect: {
          id: userId,
        },
      },
      patient: {
        connect: {
          id: patientId,
        },
      },
      courseDefinition: {
        connect: {
          id: courseDefinitionId,
        },
      },
    },
  });
};

export default addCourse;
