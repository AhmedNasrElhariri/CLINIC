import { prisma } from '@';
import { GetLevel } from '@/services/get-level';
import CryptoJS from 'crypto-js';
const editCourse = async (
  _,
  { courseId, paid, branchId, specialtyId, userId: userID, bank = null },
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
  const decryptedName = await CryptoJS.AES.decrypt(
    data.patient.name,
    'secret key 123'
  );
  const originalName = await decryptedName.toString(CryptoJS.enc.Utf8);
  const payment = bank
    ? 'C' +
      '/' +
      data.courseDefinition.name +
      '/' +
      originalName +
      '/' +
      'Bank_Payment'
    : 'C' + '/' + data.courseDefinition.name + '/' + originalName;

  const salerId = data.userId;
  await prisma.coursePayment.create({
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
          : paid + data.paid,
      price: data.price,
    },
  });
};

export default editCourse;
