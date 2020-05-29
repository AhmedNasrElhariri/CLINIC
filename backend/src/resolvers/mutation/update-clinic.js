import { prisma } from '@';

const updateClinic = async (
  _,
  { clinic: { logoId, ...clinic } },
  { userId }
) => {
  const { id } = await prisma.user.findOne({ where: { id: userId } }).clinic();

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
