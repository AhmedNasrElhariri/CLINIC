import { prisma } from '@';
import moment from 'moment';
const userCoursePayment = async (_, { userId, period }) => {
  const user = await prisma.payrollUser.findUnique({ where: { id: userId } });
  const userid = user.userId;
  const start = moment(period[0]).clone().startOf('day').toDate();
  const end = moment(period[1]).clone().endOf('day').toDate();
  return prisma.coursePayment.findMany({
    where: {
      userId: userid,
      date: {
        gte: start,
        lte: end,
      },
    },
  });
};

export default userCoursePayment;
