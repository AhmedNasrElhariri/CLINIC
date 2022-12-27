import { prisma } from '@';

const doctorSessionsDefinations = async (
  _,
  { doctorId },
  { user, organizationId }
) => {
  return prisma.doctorSessionDefination.findMany({
    where: {
      doctorId,
    },
    include: {
      session: true,
      doctor: true,
    },
  });
};

export default doctorSessionsDefinations;
