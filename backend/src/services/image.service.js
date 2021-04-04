import { prisma } from '@';
import { LAB_STATUS } from '@/utils/constants';

export const updateImagesAfterArchiveAppointment = async imagesId => {
  return prisma.image.updateMany({
    data: {
      status: LAB_STATUS.PENDING,
    },
    where: {
      id: {
        in: imagesId,
      },
    },
  });
};
