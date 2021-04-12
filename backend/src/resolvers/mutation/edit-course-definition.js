import { prisma } from '@';

const editCourseDefinition = async (_, { courseDefinition }) => {
  const { id, ...rest } = courseDefinition;

  return prisma.courseDefinition.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editCourseDefinition;
