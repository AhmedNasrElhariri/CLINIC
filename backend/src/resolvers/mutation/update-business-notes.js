import { prisma } from '@';

const updateNotes = async (_, { id, notes }) => {
  return prisma.appointment.update({
    data: {
      businessNotes: notes,
    },
    where: {
      id,
    },
  });
};

export default updateNotes;
