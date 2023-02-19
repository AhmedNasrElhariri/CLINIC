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
  console.log(patientId, 'PPa');
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
        id: appointmentId,
        type: {
          not: 'Surgery',
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
  }
};

export default appointmentHistory;
