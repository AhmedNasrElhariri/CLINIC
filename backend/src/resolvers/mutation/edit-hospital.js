import { prisma } from '@';

const editHospital = async (_, { id, hospital }) => {
  return prisma.hospital.update({
    data: hospital,
    where: {
      id,
    },
  });
};

export default editHospital;
