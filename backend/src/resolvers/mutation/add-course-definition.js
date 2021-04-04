import { prisma } from '@';

const addCourseDefinition = async (_, { courseDefinition }, { userId }) => {
  return prisma.courseDefinition.create({
    data: {
      ...courseDefinition,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export default addCourseDefinition;
