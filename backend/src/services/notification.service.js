import { prisma, pubsub } from '@';
import { formatDateFull } from '@/services/date.service';
import { NOTIFICATION } from '@/utils/notifications';
import { APIExceptcion } from '@/services/erros.service';

const APPOINTMENT_EDITED = 'APPOINTMENT_EDITED';

const publish = message => {
  pubsub.publish(NOTIFICATION, {
    notifications: {
      message,
    },
  });
};

export const createFollowUpRelation = async ({ appointmentId }) => {
  const app = await prisma.appointment.findUnique({
    where: { id: appointmentId },
  });
  const { appointmentFollowUpId } = app;
  if (appointmentFollowUpId) {
    throw new APIExceptcion('This app has followUp already');
  }
};

export const onAppointmentCreate = async ({
  userId,
  notifierId,
  appointment,
}) => {
  if (userId === notifierId) {
    return;
  }

  const message = `New appointment at ${formatDateFull(appointment.date)}`;

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
