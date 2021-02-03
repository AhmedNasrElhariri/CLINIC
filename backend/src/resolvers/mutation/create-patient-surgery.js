import { prisma } from '@';

const createPatientSurgery = async (
  _,
  { clinicId, patientSurgery },
  { userId, organizationId }
) => {
  const {
    patientId,
    surgeryId,
    hospitalId,
    fees,
    date,
    ...data
  } = patientSurgery;

  // prisma.patientSurgery.create({
  //   data: {
  //     // fees,
  //     // date,
  //     // ...data,
  //     patient: {
  //       connect: {
  //         id: patientId,
  //       },
  //     },
  //     surgery: {
  //       connect: {
  //         id: surgeryId,
  //       },
  //     },
  //     hospital: {
  //       connect: {
  //         id: hospitalId,
  //       },
  //     },
  //     organization: {
  //       connect: {
  //         id: organizationId,
  //       },
  //     },
  //     appointment: {
  //       create: {
  //         type: 'Surgery',

  //         status: 'Scheduled',
  //         specialty: 'Dentistry',
  //         doctor: {
  //           connect: { id: userId },
  //         },
  //       },
  //     },
  //   },
  // });

  const persistedPatientSurgery = await prisma.patientSurgery.create({
    data: {
      fees,
      date,
      ...data,
      patient: {
        connect: {
          id: patientId,
        },
      },
      surgery: {
        connect: {
          id: surgeryId,
        },
      },
      hospital: {
        connect: {
          id: hospitalId,
        },
      },
      organization: {
        connect: {
          id: organizationId,
        },
      },
      appointment: {
        create: {
          type: 'Surgery',
          status: 'Scheduled',
          date,
          specialty: 'Dentistry',
          doctor: {
            connect: { id: userId },
          },
          patient: {
            connect: {
              id: patientId,
            },
          },
          clinic: {
            connect: { id: clinicId },
          },
        },
      },
    },
  });

  if (fees > 0) {
    await prisma.revenue.create({
      data: {
        date,
        name: 'Surgery fees',
        amount: fees,
        clinic: {
          connect: {
            id: clinicId,
          },
        },
      },
    });
  }

  return persistedPatientSurgery;
};

export default createPatientSurgery;
