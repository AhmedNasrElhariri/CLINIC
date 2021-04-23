import { prisma } from '@';

const updateNotes = async (_, { id, notes }) => {
    console.log(notes,'dddddddddddddddddddddddddddddddd');
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
