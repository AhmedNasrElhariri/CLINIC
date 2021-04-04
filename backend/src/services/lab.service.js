import { prisma } from '@';
import { LAB_STATUS } from '@/utils/constants';

export const updateLabsAfterArchiveAppointment = async labsIs => {
  return prisma.lab.updateMany({
    data: {
      status: LAB_STATUS.PENDING,
    },
    where: {
      id: {
        in: labsIs,
      },
    },
  });
};
