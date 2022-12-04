import { prisma } from '@';

const transferAppointments = async (_, { transferData }) => {
  const { doctorId, appIds } = transferData;
  await Promise.all(
    appIds.map(appId => {
      return prisma.appointment.update({
        data: {
          doctor: {
            connect: {
              id: doctorId,
            },
          },
        },
        where: {
          id: appId,
        },
      });
    })
  );
  return true;
};

export default transferAppointments;
