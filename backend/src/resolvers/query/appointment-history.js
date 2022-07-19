import { prisma } from '@';
import { APPOINTMENTS_STATUS } from '@/utils/constants';
import * as R from 'ramda';

const appointmentHistory = async (_, { appointmentId, patientId }) => {
  if (appointmentId) {
    const patient = await prisma.patient
      .findMany({
        where: {
          appointments: {
            some: {
              id: appointmentId,
            },
          },
        },
        take: 1,
      })
      .then(R.propOr({}, '0'));
    patientId = patient.id;
  }

  return prisma.appointment.findMany({
    where: {
      patient: {
        id: patientId,
      },
    },
    orderBy: {
      date: 'desc',
    },
  });
};

export default appointmentHistory;
