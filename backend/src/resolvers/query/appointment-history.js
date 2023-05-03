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

  const apps =
    type !== 'Surgery'
      ? await prisma.appointment.findMany({
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
        })
      : await prisma.appointment.findMany({
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

  const filteredApps =
    type !== 'Surgery'
      ? apps.filter(
          ({ data, notes, sessionsPulses, pictures }) =>
            data.length > 0 ||
            notes.length !== 0 ||
            sessionsPulses.length > 0 ||
            pictures.length > 0
        )
      : apps;
  return filteredApps;
};

export default appointmentHistory;
