import { prisma } from '@';

const updateClinic = async (_, { clinic: { id, logoId, ...clinic } }) => {
  return prisma.clinic.update({
    data: Object.assign(
      clinic,
      logoId && {
        logo: {
          connect: {
            id: logoId,
          },
        },
      }
    ),
    where: { id },
  });
};

export default updateClinic;
