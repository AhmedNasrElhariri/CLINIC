import { prisma } from '@';
const editCourseUnitHistory = async (
  _,
  { transactionId, consumed, courseId },
  { userId }
) => {
  const course = await prisma.course.findUnique({ where: { id: courseId } });
  const transaction = await prisma.courseUnitsHistory.findUnique({
    where: { id: transactionId },
  });
  await prisma.course.update({
    data: {
      consumed: course.consumed - transaction.units + consumed,
    },
    where: {
      id: courseId,
    },
  });
  return prisma.courseUnitsHistory.update({
    data: {
      units: consumed,
    },
    where: {
      id: transactionId,
    },
  });
};

export default editCourseUnitHistory;
