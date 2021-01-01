import { prisma } from '@';

const defineSurgery = async (_, { surgery }, { organizationId }) => {
  return prisma.surgery.create({
    data: {
      ...surgery,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default defineSurgery;
