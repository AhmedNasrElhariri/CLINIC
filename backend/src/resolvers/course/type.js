import { prisma } from '@';

const type = async ({ courseDefinitionId, id }) => {
  if (courseDefinitionId) {
    const course = await prisma.course
      .findUnique({ where: { id } })
      .courseDefinition();
    const { type } = course;
    return type;
  } else {
    return 'Custom';
  }
};

export default type;
