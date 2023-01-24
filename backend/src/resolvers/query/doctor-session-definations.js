import { prisma } from '@';

const doctorSessionsDefinations = async (
  _,
  { doctorId, referedDoctor },
  { user, organizationId }
) => {
  return prisma.doctorSessionDefination.findMany({
    where: Object.assign(
      {
        doctorId,
        referedDoctor,
      },
    ),
    include: {
      session: true,
      doctor: true,
    },
  });
};

export default doctorSessionsDefinations;
