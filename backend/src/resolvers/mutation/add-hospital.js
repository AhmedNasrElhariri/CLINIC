import { prisma } from '@';

const addHospital = async (_, { hospital }, { organizationId }) => {
  console.log(organizationId);
  return prisma.hospital.create({
    data: {
      ...hospital,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default addHospital;
