import { prisma } from '@';

const myMedicinesDefinition = (_, __, { userId }) => {
  return prisma.medicineDefinition.findMany({
    where: {
      userId,
    },
  });
};

export default myMedicinesDefinition;
