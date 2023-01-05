import { prisma } from '@';

const addNewwDoctorFees = async (
  _,
  { doctorFees },
  { organizationId, userId }
) => {
  return prisma.doctorFees.create({
    data: {
      ...doctorFees,
      userId,
      organizationId,
    },
  });
};

export default addNewwDoctorFees;
