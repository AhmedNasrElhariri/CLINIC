import { prisma } from '@';

const addRoomDefinition = async (_, { roomDefinition }, { organizationId }) => {
  return prisma.roomDefinition.create({
    data: {
      ...roomDefinition,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default addRoomDefinition;
