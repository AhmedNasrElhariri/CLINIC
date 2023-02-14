import { prisma } from '@';
import { GetLevel } from '@/services/get-level';
import { costServices } from '@/services/cost-of-doctor-course.services';
import { APIExceptcion } from '@/services/erros.service';
import {
  reduceServices,
  CreateUnitHistoryFormParts,
  CreatePaymentFormParts,
} from '@/services/course-parts.services';
const paidCourseWithDoctorFees = async (
  _,
  {
    courseId,
    paid,
    visaPaid = 0,
    branchId,
    specialtyId,
    userId: userID,
    bank = null,
    sessions,
  },
  { userId, organizationId }
) => {
  const level = GetLevel(branchId, specialtyId, userID);
  const data = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      patient: true,
    },
  });
  const totalPaid = paid + data.paid;
  let cName = data.customName;
  if (totalPaid > data.price) {
    throw new APIExceptcion(
      `You pay more than the required you should pay ${data.price - data.paid}`
    );
  }
  await reduceServices(sessions, courseId);
  const totalUnits = sessions.reduce((sum, { number }) => sum + number, 0);
  const doctorId = data.doctorId;
  const { courseDefinitionId } = data;
  if (courseDefinitionId) {
    const courseDefination = await prisma.courseDefinition.findUnique({
      where: { id: courseDefinitionId },
    });
    cName = courseDefination.name;
  }
  const bankPayment =
    'C' + '/' + cName + '/' + data.patient.name + '/' + 'Bank_Payment';
  const cashPayment = 'C' + '/' + cName + '/' + data.patient.name;
  const patientId = data.patient.id;

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

  await CreatePaymentFormParts(
    sessions,
    userId,
    doctorId,
    courseId,
    specialtyId,
    branchId
  );
  await CreateUnitHistoryFormParts(sessions, userId, doctorId, courseId);
  await costServices(
    userId,
    sessions,
    organizationId,
    branchId,
    specialtyId,
    doctorId,
    cName
  );
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
            id: data.doctorId,
          },
        },
        consumed: data.consumed + totalUnits,
        paid:
          paid === data.price || paid >= data.price
            ? data.price
            : bank != null
            ? paid + data.paid + visaPaid
            : paid + data.paid,
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

export default paidCourseWithDoctorFees;
