import { prisma } from '@';

const deleteAppointmentPhoto = async (_, { id }) => {
  return await prisma.file.delete({
    where: {
      id,
    },
  });
};

export default deleteAppointmentPhoto;
