import { prisma } from '@';

const appointments = async ({ id }) => {
  const appointmentCourses = await prisma.appointmentsOnCourses.findMany({
    where: { courseId: id },
  });
  const appIds = appointmentCourses.map((ele) => {
    return ele.appointmentId;
  });
  return await prisma.appointment.findMany({
    where: {
      id: {
        in: appIds,
      },
    },
  });
  // return prisma.appointmentsOnCourses
  //   .findMany({ where: { courseId: id } })
  //   .appointment();
};

export default appointments;
