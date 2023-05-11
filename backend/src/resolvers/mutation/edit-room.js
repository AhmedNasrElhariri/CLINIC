import { prisma } from '@';

const editRoomDefinition = async (_, { roomDefinition }) => {
  const { id, ...rest } = roomDefinition;

  return prisma.roomDefinition.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editRoomDefinition;
