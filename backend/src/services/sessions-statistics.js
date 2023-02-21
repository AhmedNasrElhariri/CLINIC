import { prisma } from '@';
import * as R from 'ramda';

const sumByProp = (arr, key) =>
  arr.reduce((acc, record) => acc + record[key], 0);

export const sessionsStatistics = async (sessionIds, startDay, endDay) => {
  const sessions = await prisma.sessionDefinition.findMany({
    where: {
      id: {
        in: sessionIds,
      },
    },
  });
  let sessionsTransactions = await prisma.sessionTransaction.findMany({
    where: {
      sessionId: {
        in: sessionIds,
      },
      date: {
        gte: startDay,
        lte: endDay,
      },
    },
    select: {
      sessionId: true,
      number: true,
    },
  });
  sessionsTransactions = R.groupBy(R.prop('sessionId'))(sessionsTransactions);
  sessionsTransactions = Object.entries(sessionsTransactions).reduce(
    (acc, [sessionId, transactions]) => ({
      ...acc,
      [sessionId]: sumByProp(transactions, 'number'),
    }),
    {}
  );

  const allSessionsRevenues = await Promise.all(
    sessions.map(({ name }) =>
      prisma.revenue.findMany({
        where: {
          name: {
            contains: name,
          },
          date: {
            gte: startDay,
            lte: endDay,
          },
        },
        include: { patient: true, doctor: true },
      })
    )
  );
  const statistics = sessions.map(({ id, name }, index) => {
    return {
      name: name,
      totalNumber: sessionsTransactions[id],
      totalPrice: sumByProp(allSessionsRevenues[index], 'amount'),
      sessions: allSessionsRevenues[index],
    };
  });
  return statistics;
};
