import { prisma } from '@';

const editDoctorFees = async (_, { doctorFees }) => {
  const { id, ...rest } = doctorFees;

  return prisma.doctorFees.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editDoctorFees;
