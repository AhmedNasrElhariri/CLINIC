import { prisma } from '@';
import moment from 'moment';

function groupArrayOfObjects(list, key) {
  return list.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

const nuniquePatients = arr => {
  const uniqueIds = [];

  const unique = arr.filter(({ patient, doctor }) => {
    const isDuplicate = uniqueIds.includes(patient.id);

    if (!isDuplicate) {
      uniqueIds.push(patient.id);

      return true;
    }

    return false;
  });
  return unique;
};

const sessionStatistics = async (
  _,
  { sessionsIds, dateFrom, dateTo },
  { user, organizationId }
) => {
  const startDay = moment(dateFrom).startOf('day').toDate();
  const endDay = moment(dateTo).endOf('day').toDate();
  const sessions = await prisma.sessionDefinition.findMany({
    where: {
      id: {
        in: sessionsIds,
      },
    },
  });

  // const stat = await prisma.sessionTransaction.groupBy({
  //   by: ['sessionId'],
  //   sum: {
  //     price: true,
  //     number: true,
  //   },

  //   where: {
  //     date: {
  //       gte: startDay,
  //       lte: endDay,
  //     },
  //     sessionId: {
  //       in: sessionsIds,
  //     },
  //   },
  // });
  const sessionsTransactions = await prisma.sessionTransaction.findMany({
    where: {
      sessionId: {
        in: sessionsIds,
      },
      date: {
        gte: startDay,
        lte: endDay,
      },
    },
  });
  const updatedSessionsTransactions = sessionsTransactions.map(s => {
    return { ...s, totalPrice: s.number * s.price };
  });

  const groups = groupArrayOfObjects(updatedSessionsTransactions, 'sessionId');
  const groupsValue = Object.values(groups);
  const totalsessions = groupsValue.map(g => {
    let totalNumber = 0;
    let totalPrice = 0;
    g.forEach(s => {
      totalNumber += s.number;
      totalPrice += s.totalPrice;
    });
    return {
      sessionId: g[0].sessionId,
      totalNumber: totalNumber,
      totalPrice: totalPrice,
    };
  });
  const statistics = totalsessions.map(async ts => {
    const session = sessions.find(s => s.id == ts.sessionId);
    const revenues = await prisma.revenue.findMany({
      where: {
        name: { contains: session.name },
        date: {
          gte: startDay,
          lte: endDay,
        },
      },
      include: { patient: true, doctor: true },
    });
    const updatedRevenue = revenues.map(rr => {
      return { patient: rr.patient, doctor: rr.doctor };
    });
    const uniRevenues = nuniquePatients(updatedRevenue);
    return {
      name: session.name,
      totalNumber: ts.totalNumber,
      totalPrice: ts.totalPrice,
      sessions: uniRevenues,
    };
  });

  return statistics;
};

export default sessionStatistics;
