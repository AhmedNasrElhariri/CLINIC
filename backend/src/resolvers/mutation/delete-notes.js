import { prisma } from '@';

const deleteNotes = async (_, { id }) => {
  return await prisma.patientNotes.delete({
    where: {
      id: id,
    },
  });
};

export default deleteNotes;
