import { prisma } from '@';
import { APPOINTMENTS_STATUS, COURSE_STATUS } from '@/utils/constants';
const deleteCourse = async (
  _,
  { courseId, refund, bank, branchId, specialtyId, userId: USERID },
  { userId, organizationId }
) => {
  const data = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      patient: true,
    },
  });
  let cName = data.customName;
  const { courseDefinitionId } = data;
  if (courseDefinitionId) {
    const courseDefination = await prisma.courseDefinition.findUnique({
      where: { id: courseDefinitionId },
    });
    cName = courseDefination.name;
  }
  let status =
    new Date() < data.startDate
      ? COURSE_STATUS.REJECTED
      : COURSE_STATUS.CANCELLED;
  const { patient, courseDefinition } = data;
  await prisma.coursePayment.create({
    data: Object.assign({
      payment: refund,
      type: 'Refund',
      date: new Date(),
      user: {
        connect: {
          id: userId,
        },
      },
      course: {
        connect: {
          id: courseId,
        },
      },
    }),
  });
  if (bank) {
    await prisma.bankExpense.create({
      data: Object.assign(
        {
          name: 'C/' + cName + '/Refund/' + patient.name,
          amount: refund,
          expenseType: 'refund',
          date: new Date(),
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
          bank: {
            connect: {
              id: bank,
            },
          },
          patient: {
            connect: {
              id: patient.id,
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
        specialtyId && {
          specialty: {
            connect: {
              id: specialtyId,
            },
          },
        },
        USERID && {
          doctor: {
            connect: {
              id: USERID,
            },
          },
        }
      ),
    });
  } else {
    await prisma.expense.create({
      data: Object.assign(
        {
          name: 'C/' + cName + '/Refund/' + patient.name,
          amount: refund,
          expenseType: 'refund',
          date: new Date(),
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
        branchId && {
          branch: {
            connect: {
              id: branchId,
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
        USERID && {
          doctor: {
            connect: {
              id: USERID,
            },
          },
        }
      ),
    });
  }
  return prisma.course.update({
    where: {
      id: courseId,
    },
    data: Object.assign(
      {
        patient: {
          connect: {
            id: data.patientId,
          },
        },
        user: {
          connect: {
            id: data.userId,
          },
        },
        doctor: {
          connect: {
            id: data.userId,
          },
        },
        sessions: {
          updateMany: {
            where: {
              status: APPOINTMENTS_STATUS.SCHEDULED,
            },
            data: {
              status: APPOINTMENTS_STATUS.CANCELLED,
            },
          },
        },
        status: status,
        endDate: new Date(),
        paid: data.paid,
        price: data.price,
      },
      courseDefinitionId && {
        courseDefinition: {
          connect: {
            id: courseDefinitionId,
          },
        },
      }
    ),
  });
};

export default deleteCourse;
