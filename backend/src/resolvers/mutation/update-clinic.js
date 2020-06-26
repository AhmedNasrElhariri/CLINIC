import { prisma } from '@';

const updateClinic = async (_, { clinic: { id, logoId, ...clinic } }) => {
  return prisma.clinic.update({
    data: {
      ...clinic,
      logo: {
        connect: {
          id: logoId,
        },
      },
    },
    where: { id },
  });
};

export default updateClinic;
