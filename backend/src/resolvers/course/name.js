import { prisma } from '@';

const name = async ({ courseDefinitionId, customName, id }) => {
  if (courseDefinitionId) {
    const course = await prisma.course
      .findUnique({ where: { id } })
      .courseDefinition();
    const { name } = course;
    return name;
  } else {
    return customName;
  }
};

export default name;
