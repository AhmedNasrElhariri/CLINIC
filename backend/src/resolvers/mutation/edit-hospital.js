import { prisma } from '@';

const editHospital = async (_, { hospital, type }) => {
  const { id, ...rest } = hospital;
  if (type === 'edit') {
    return prisma.hospital.update({
      data: rest,
      where: {
        id,
      },
    });
  } else {
    return prisma.hospital.delete({
      where: {
        id,
      },
    });
  }
};

export default editHospital;
