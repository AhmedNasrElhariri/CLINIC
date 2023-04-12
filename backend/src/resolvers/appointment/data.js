import { prisma } from '@';

const data = ({ id, data }) => {
  if (data) {
    return data;
  }
  return prisma.appointment.findUnique({ where: { id } }).data();
};

export default data;
