import { prisma } from '@';

const addHospital = async (_, { hospital }, { organizationId }) => {
  return prisma.hospital
    .create({
      data: {
        ...hospital,
        organization: {
          connect: {
            id: organizationId,
          },
        },
      },
    })
    .catch(e => {
      console.log(e);
      throw new Error('ddd');
    });
};

export default addHospital;
