import { prisma } from '@';

const editDoctorFees = async (_, { doctorFees }) => {
  const { id, name, amount } = doctorFees;

  return prisma.doctorFees.update({
    data: { name, amount },
    where: {
      id,
    },
  });
};

export default editDoctorFees;
