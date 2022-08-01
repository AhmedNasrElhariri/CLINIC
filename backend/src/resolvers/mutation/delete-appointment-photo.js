import { prisma } from '@';

const deleteAppointmentPhoto = async (_, { id }) => {
  const appFile = await prisma.appointmentFile.findUnique({
    where: {
      fileId: id,
    },
  });
  if (appFile) {
    await prisma.appointmentFile.delete({
      where: {
        fileId: id,
      },
    });
  } else {
    await prisma.file.delete({
      where: {
        id,
      },
    });
  }
  return id;
};

export default deleteAppointmentPhoto;
