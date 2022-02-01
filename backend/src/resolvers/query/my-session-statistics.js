import { prisma } from '@';
import moment from 'moment';

const sessionStatistics = async (
  _,
  { sessionId, dateFrom, dateTo },
  { user, organizationId }
) => {
  const startDay = moment(dateFrom).startOf('day').toDate();
  const endDay = moment(dateTo).endOf('day').toDate();
  let totalPrice = 0;
  const session = await prisma.sessionDefinition.findUnique({
    where: {
      id: sessionId,
    },
  });
  const sessionTransactions = await prisma.sessionTransaction.findMany({
    where: {
      sessionId,
      date: {
        gte: startDay,
        lte: endDay,
      },
    },
  });
  const totalNumber = await prisma.sessionTransaction.aggregate({
    sum: { number: true },
    where: {
      sessionId,
      date: {
        gte: startDay,
        lte: endDay,
      },
    },
  });

  //   const totalPrice = await prisma.sessionTransaction.aggregate({
  //     sum: { price: true },
  //     where: {
  //       sessionId,
  //       date: {
  //         gte: startDay,
  //         lte: endDay,
  //       },
  //     },
  //   });
  await sessionTransactions.forEach(s => {
    let sum = s.number * s.price;
    totalPrice += sum;
  });

  const data = {
    session: session,
    totalNumber: totalNumber.sum.number,
    totalPrice: totalPrice,
  };
  return data;
};

export default sessionStatistics;
