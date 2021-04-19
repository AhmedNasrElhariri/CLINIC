import { prisma } from '@';

const myCourses = (_, { appointmentId }) => {
  const user = prisma.appointment.findOne({
    where: {
      id: appointmentId,
    },
  });
  const userId = user.id;
  const userSpecialty = prisma.userSpecialty.findOne({
    where: {
      userId: userId,
    },
  });
  const userIds = prisma.userSpecialty.findMany({
    where: {
      branchId: userSpecialty.branchId,
      specialtyId: userSpecialty.specialtyId,
    },
  });
};

export default myCourses;
