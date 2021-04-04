import { prisma } from '@';

const myCourses = (_, { appointmentId }) => {
  const userId = prisma.appointment.findOne({where})
};

export default myCourses;
