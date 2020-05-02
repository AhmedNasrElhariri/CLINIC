import * as R from 'ramda';
import moment from 'moment';

import { prisma } from '@';

const appointments = (_, { input }) => {
  // let dates = getStartAndEndDateOfDay(input);
  return prisma.appointment.findMany({
    where: {
      date: {
        gte: input.fromDate,
        lte: input.toDate,
      },
    },
  });
};

const getStartAndEndDateOfDay = input => {
  const date = R.path(['date'])(input);
  return date
    ? [
        moment(input.date)
          .startOf('day')
          .toDate(),
        moment(input.date)
          .endOf('day')
          .toDate(),
      ]
    : [];
};

export default appointments;
