import { prisma } from '@';
import { APPOINTMENTS_STATUS, COURSE_STATUS } from '@/utils/constants';
import CryptoJS from 'crypto-js';
const deleteCourse = async (
  _,
  { courseId, refund },
  { userId, organizationId }
) => {
  const data = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      patient: true,
      courseDefinition: true,
    },
  });
  let status =
    new Date() < data.startDate
      ? COURSE_STATUS.REJECTED
      : COURSE_STATUS.CANCELLED;
  console.log(data, 'DDDDDDDDDDDDD');
  const { patient, courseDefinition } = data;
  const decryptedName = await CryptoJS.AES.decrypt(
    patient.name,
    'secret key 123'
  );
  const originalName = await decryptedName.toString(CryptoJS.enc.Utf8);
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
  await prisma.expense.create({
    data: {
      name: 'C/'+courseDefinition.name + '/Refund/' + originalName,
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
  });
};

export default deleteCourse;
