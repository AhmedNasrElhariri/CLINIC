import { prisma } from '@';

const editHospital = async (_, { hospital }) => {
  const { id, ...rest } = hospital;

  return prisma.hospital.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editHospital;
