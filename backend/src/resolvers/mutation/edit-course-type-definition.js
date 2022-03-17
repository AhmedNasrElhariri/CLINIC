import { prisma } from '@';

const editCourseTypeDefinition = async (_, { courseTypeDefinition }) => {
  const { id, ...rest } = courseTypeDefinition;

  return prisma.courseTypeDefinition.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editCourseTypeDefinition;
