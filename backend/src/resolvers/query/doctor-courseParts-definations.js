import { prisma } from '@';

const doctorCoursePartsDefinations = async (
  _,
  { doctorId },
  { user, organizationId }
) => {
  return prisma.doctorCoursePartDefination.findMany({
    where: Object.assign(
      {
        doctorId,
      },
    ),
    include: {
      part: true,
      doctor: true,
    },
  });
};

export default doctorCoursePartsDefinations;
