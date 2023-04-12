import { prisma } from '@';
import * as R from 'ramda';

const appointmentHistory = async (_, { appointmentId, patientId, type }) => {
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
  let apps = [];
  if (type === 'Surgery') {
    apps = await prisma.appointment.findMany({
      where: {
        patient: {
          id: patientId,
        },
        type: 'Surgery',
      },
      include: {
        patientSurgeries: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }
  apps = await prisma.appointment.findMany({
    where: {
      patient: {
        id: patientId,
      },
      type: {
        not: 'Surgery',
      },
      status: {
        notIn: ['Cancelled'],
      },
    },
    include: {
      data: true,
      patient: true,
      pictures: { include: { file: true } },
    },
    orderBy: {
      date: 'desc',
    },
  });
  const filteredApps = apps.filter(
    ({ data, notes, sessionsPulses, pictures }) =>
      data.length > 0 ||
      notes.length !== 0 ||
      sessionsPulses.length > 0 ||
      pictures.length > 0
  );
  return filteredApps;
};

export default appointmentHistory;
