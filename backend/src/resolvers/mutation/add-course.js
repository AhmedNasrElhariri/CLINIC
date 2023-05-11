import { prisma } from '@';
import {
  APPOINTMENTS_TYPES,
  APPOINTMENTS_STATUS,
  COURSE_STATUS,
} from '@/utils/constants';
import { GetLevel } from '@/services/get-level';
import {
  createCourseParts,
  createCoursePartsFromCourse,
} from '@/services/create-courrse-parts';
const addCourse = async (_, { course }, { userId, organizationId }) => {
  const {
    patientId,
    courseDefinitionId,
    price,
    customName,
    customUnits,
    paid,
    discount,
    sessions,
    doctorId,
    branchId,
    specialtyId,
    userId: userID,
    bank,
    selectedParts,
  } = course;

  const level = GetLevel(branchId, specialtyId, userID);
  const startDate = sessions.length > 0 ? sessions[0] : new Date();
  const endDate =
    sessions.length > 0 ? sessions[sessions.length - 1] : new Date();
  let courseDef = {},
    cName = '';

  if (courseDefinitionId) {
    courseDef = await prisma.course.create({
      data: {
        price,
        paid,
        discount,
        startDate,
        endDate,
        status: COURSE_STATUS.INPROGRESS,
        user: {
          connect: {
            id: userId,
          },
        },
        doctor: {
          connect: {
            id: doctorId,
          },
        },
        patient: {
          connect: {
            id: patientId,
          },
        },
        courseDefinition: {
          connect: {
            id: courseDefinitionId,
          },
        },

        sessions: {
          create: sessions.map(date => ({
            type: APPOINTMENTS_TYPES.Session,
            status: APPOINTMENTS_STATUS.SCHEDULED,
            patient: {
              connect: {
                id: patientId,
              },
            },
            user: {
              connect: {
                id: userId,
              },
            },
            doctor: {
              connect: {
                id: doctorId,
              },
            },
            date,
          })),
        },
      },
      include: {
        patient: true,
      },
    });
    const courseDefination = await prisma.courseDefinition.findUnique({
      where: { id: courseDefinitionId },
    });
    cName = courseDefination.name;
  } else {
    courseDef = await prisma.course.create({
      data: {
        price,
        paid,
        customName,
        customUnits,
        discount,
        startDate,
        endDate,
        status: COURSE_STATUS.INPROGRESS,
        user: {
          connect: {
            id: userId,
          },
        },
        doctor: {
          connect: {
            id: doctorId,
          },
        },
        patient: {
          connect: {
            id: patientId,
          },
        },
        sessions: {
          create: sessions.map(date => ({
            type: APPOINTMENTS_TYPES.Session,
            status: APPOINTMENTS_STATUS.SCHEDULED,
            patient: {
              connect: {
                id: patientId,
              },
            },
            user: {
              connect: {
                id: userId,
              },
            },
            doctor: {
              connect: {
                id: doctorId,
              },
            },
            date,
          })),
        },
      },
      include: {
        patient: true,
      },
    });
    cName = customName;
  }
  if (selectedParts) {
    const courseId = courseDef.id;
    await createCourseParts(
      createCoursePartsFromCourse(selectedParts, courseId, organizationId)
    );
  }
  await prisma.coursePayment.create({
    data: {
      payment: paid,
      date: new Date(),
      user: {
        connect: {
          id: userId,
        },
      },
      course: {
        connect: {
          id: courseDef.id,
        },
      },
    },
  });
  let payment = 'C' + '/' + cName + '/' + courseDef.patient.name;
  if (bank) {
    await prisma.bankRevenue.create({
      data: Object.assign(
        {
          date: new Date(),
          name: payment,
          amount: paid,
          level,
          organization: {
            connect: {
              id: organizationId,
            },
          },
          bank: {
            connect: {
              id: bank,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
        specialtyId && {
          specialty: {
            connect: {
              id: specialtyId,
            },
          },
        },
        branchId && {
          branch: {
            connect: {
              id: branchId,
            },
          },
        },
        userID && {
          doctor: {
            connect: {
              id: userID,
            },
          },
        }
      ),
    });
  } else {
    await prisma.revenue.create({
      data: Object.assign(
        {
          level,
          name: payment,
          date: new Date(),
          amount: paid,
          organization: {
            connect: {
              id: organizationId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
        specialtyId && {
          specialty: {
            connect: {
              id: specialtyId,
            },
          },
        },
        branchId && {
          branch: {
            connect: {
              id: branchId,
            },
          },
        },
        userID && {
          doctor: {
            connect: {
              id: userID,
            },
          },
        },
        patientId && {
          patient: {
            connect: {
              id: patientId,
            },
          },
        }
      ),
    });
  }
  return courseDef;
};

export default addCourse;
