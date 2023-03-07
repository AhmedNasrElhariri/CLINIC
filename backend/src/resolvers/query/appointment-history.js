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

  if (type === 'Surgery') {
    return prisma.appointment.findMany({
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
  } else {
    return prisma.appointment.findMany({
      where: {
        patient: {
          id: patientId,
        },
        type: {
          not: 'Surgery',
        },
      },
      include: {
        data: true,
        patient: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }
};

export default appointmentHistory;
