import { prisma } from '@';

const editCourseDefinition = async (_, { courseDefinition, type }) => {
  const { id, ...rest } = courseDefinition;
  if (type === 'edit') {
    return prisma.courseDefinition.update({
      data: rest,
      where: {
        id,
      },
    });
  } else {
    return prisma.courseDefinition.delete({ where: { id } });
  }
};

export default editCourseDefinition;
