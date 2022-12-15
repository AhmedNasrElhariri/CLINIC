import { prisma } from '@';
import moment from 'moment';
const logging = async (
  _,
  { offset, limit, dateFrom, dateTo, userId, model, tagName },
  { user, organizationId }
) => {
  const startDay = moment(dateFrom).startOf('day').toDate();
  const endDay = moment(dateTo).endOf('day').toDate();
  const count = await prisma.logging.count({
    where: Object.assign(
      {
        organizationId,
      },
      dateTo &&
        dateFrom && {
          date: {
            gte: startDay,
            lte: endDay,
          },
        },
      userId && {
        userId: userId,
      },
      model && {
        model: model,
      },
      tagName && {
        tagName: tagName,
      }
    ),
  });
  const loggings = await prisma.logging.findMany({
    where: Object.assign(
      {
        organizationId,
      },
      dateTo &&
        dateFrom && {
          date: {
            gte: startDay,
            lte: endDay,
          },
        },
      userId && {
        userId: userId,
      },
      model && {
        model: model,
      },
      tagName && {
        tagName: tagName,
      }
    ),
    include: {
      user: true,
    },
    skip: offset,
    take: limit,
  });
  const data = {
    logging: loggings,
    loggingCount: count,
  };
  return data;
};

export default logging;
