import { prisma } from '@';
import { GetLevel } from '@/services/get-level';
const editCourse = async (
  _,
  { courseId, paid, branchId, specialtyId, userId: userID },
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
  const payment =
    'C' + '/' + data.courseDefinition.name + '/' + data.patient.name;
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
      }
    ),
  });
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
          id: courseId,
        },
      },
    },
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
          : paid + data.paid,
      price: data.price,
    },
  });
};

export default editCourse;
