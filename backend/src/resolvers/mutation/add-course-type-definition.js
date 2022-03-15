import { prisma } from '@';

const addCourseTypeDefinition = async (
  _,
  { courseTypeDefinition },
  { organizationId }
) => {
  const { name, price } = courseTypeDefinition;
  return prisma.courseTypeDefinition.create({
    data: {
      name,
      price,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default addCourseTypeDefinition;
