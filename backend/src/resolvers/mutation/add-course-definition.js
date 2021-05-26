import { prisma } from '@';

const addCourseDefinition = async (_, { courseDefinition }, { organizationId }) => {
  return prisma.courseDefinition.create({
    data: {
      ...courseDefinition,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default addCourseDefinition;
