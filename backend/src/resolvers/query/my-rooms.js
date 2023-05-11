import { prisma } from '@';

const myRoomsDefinition = (_, __, { organizationId }) => {
  return prisma.roomDefinition.findMany({
    where: {
      organizationId,
    },
  });
};

export default myRoomsDefinition;
