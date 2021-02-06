import { prisma } from '@';

const addHospital = async (_, { hospital }, { organizationId }) => {
  console.log({ hospital });
  console.log({ organizationId });
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
