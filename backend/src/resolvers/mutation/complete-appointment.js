import { prisma } from '@';
import * as R from 'ramda';
import { APPOINTMENTS_STATUS } from '@/utils/constants';
import { updateLabsAfterArchiveAppointment } from '@/services/lab.service';
import { updateImagesAfterArchiveAppointment } from '@/services/image.service';

const completeAppointment = async (_, { id }, { userId, organizationId }) => {
  const appointment = await prisma.appointment.update({
    data: { status: APPOINTMENTS_STATUS.ARCHIVED },
    where: { id },
    include: {
      labs: true,
      images: true,
    },
  });
  const { labs, images } = appointment;

  await Promise.all([
    updateLabsAfterArchiveAppointment(R.map(R.prop('id'))(labs)),
    updateImagesAfterArchiveAppointment(R.map(R.prop('id'))(images)),
  ]);
  return appointment;
};

export default completeAppointment;
