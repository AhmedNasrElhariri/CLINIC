import { prisma, pubsub } from '@';
import { formatDateFull } from '@/services/date.service';
import { NOTIFICATION } from '@/utils/notifications';

const APPOINTMENT_EDITED = 'APPOINTMENT_EDITED';

const publish = message => {
  pubsub.publish(NOTIFICATION, {
    notifications: {
      message,
    },
  });
};

export const onAppointmentCreate = async ({
  userId,
  notifierId,
  clinicId,
  appointment,
}) => {
  if (userId === notifierId) {
    return;
  }
  const clinic = await prisma.clinic.findOne({ where: { id: clinicId } });

  const message = `New appointment at ${formatDateFull(appointment.date)} - ${
    clinic.name
  } clinic`;

  const notification = await await prisma.notification.create({
    data: {
      userId,
      notifierId,
      type: APPOINTMENT_EDITED,
      message,
    },
  });

  publish(notification.message);
};

export const onAppointmentEdit = async ({
  userId,
  notifierId,
  oldDate,
  newDate,
}) => {
  const message = `An appointment has been edited from ${formatDateFull(
    oldDate
  )} to be ${formatDateFull(newDate)}`;

  const notification = await prisma.notification.create({
    data: {
      userId,
      notifierId,
      type: APPOINTMENT_EDITED,
      message,
    },
  });

  publish(notification.message);
};
