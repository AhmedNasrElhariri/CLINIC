import { prisma } from '@';
import { GetLevel } from '@/services/get-level';
const editCoursePaymentHistory = async (
  _,
  {
    courseId,
    paid,
    branchId,
    specialtyId,
    userId: userID,
    bank = null,
    paymentId,
  },
  { userId, organizationId }
) => {
  const level = GetLevel(branchId, specialtyId, userID);
  const data = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      courseDefinition: true,
      patient: true,
    },
  });
  const payment = bank
    ? 'C' +
      '/' +
      data.courseDefinition.name +
      '/' +
      data.patient.name +
      '/' +
      'Bank_Update_Payment'
    : 'C' +
      '/' +
      data.courseDefinition.name +
      '/' +
      data.patient.name +
      'Update_Payment';

  const salerId = data.userId;
  const oldPayment = await prisma.coursePayment.findUnique({
    where: {
      id: paymentId,
    },
  });
  await prisma.coursePayment.update({
    data: Object.assign(
      {
        payment: paid,
        date: new Date(),
        user: {
          connect: {
            id: salerId,
          },
        },
        course: {
          connect: {
            id: courseId,
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
    where: {
      id: paymentId,
    },
  });
  if (bank != null) {
    await prisma.bankRevenue.create({
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
        }
      ),
    });
  }

  await prisma.expense.create({
    data: Object.assign(
      {
        level,
        name: 'Refund_course_payment',
        expenseType: 'old_course_payment',
        date: new Date(),
        amount: oldPayment.payment,
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
      }
    ),
  });
  return prisma.course.update({
    where: {
      id: courseId,
    },
    data: {
      patient: {
        connect: {
          id: data.patientId,
        },
      },
      courseDefinition: {
        connect: {
          id: data.courseDefinitionId,
        },
      },
      user: {
        connect: {
          id: data.userId,
        },
      },
      doctor: {
        connect: {
          id: data.doctorId,
        },
      },
      paid:
        paid === data.price || paid >= data.price
          ? data.price
          : paid + data.paid - oldPayment.payment,
      price: data.price,
    },
  });
};

export default editCoursePaymentHistory;
