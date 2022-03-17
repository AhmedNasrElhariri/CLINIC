import { prisma } from '@';

const units = async ({ courseDefinitionId, id, customUnits }) => {
  if (courseDefinitionId) {
    const course = await prisma.course
      .findUnique({ where: { id } })
      .courseDefinition();
    const { units } = course;
    return units;
  } else {
    return customUnits;
  }
};

export default units;
