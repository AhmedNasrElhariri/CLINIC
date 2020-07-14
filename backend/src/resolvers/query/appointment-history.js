import { prisma } from '@';
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
        first: 1,
      })
      .then(R.propOr({}, '0'));
    patientId = patient.id;
  }
  return prisma.appointment.findMany({
    where: {
      status: 'Archived',
      patient: {
        id: patientId,
      },
    },
  });
};

export default appointmentHistory;
