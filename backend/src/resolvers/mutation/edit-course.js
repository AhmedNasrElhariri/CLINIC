import { prisma } from '@';
import { GetLevel } from '@/services/get-level';
const editCourse = async (
  _,
  {
    courseId,
    paid,
    visaPaid = 0,
    branchId,
    specialtyId,
    userId: userID,
    bank = null,
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
  const bankPayment =
    'C' +
    '/' +
    data.courseDefinition.name +
    '/' +
    data.patient.name +
    '/' +
    'Bank_Payment';
  const cashPayment =
    'C' + '/' + data.courseDefinition.name + '/' + data.patient.name;

  const salerId = data.userId;
  const patientId = data.patient.id;
  await prisma.coursePayment.create({
    data: Object.assign(
      {
        payment: bank != null ? paid + visaPaid : paid,
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
  });
  if (bank != null) {
    if (paid > 0) {
      await prisma.revenue.create({
        data: Object.assign(
          {
            level,
            name: cashPayment,
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
    await prisma.bankRevenue.create({
      data: Object.assign(
        {
          level,
          name: bankPayment,
          date: new Date(),
          amount: visaPaid,
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
  } else {
    await prisma.revenue.create({
      data: Object.assign(
        {
          level,
          name: cashPayment,
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
          : bank != null
          ? paid + data.paid + visaPaid
          : paid + data.paid,
      price: data.price,
    },
  });
};

export default editCourse;
