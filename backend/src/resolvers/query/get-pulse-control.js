import { prisma } from '@';
import * as moment from 'moment';
import * as R from 'ramda';
const sortByDate = R.sortBy(R.compose(R.prop('date')));
const getPulseControl = async () => {
  const startOfTodayDay = moment(new Date()).startOf('day').toDate();
  const endOfTodayDay = moment(new Date()).endOf('day').toDate();
  const TodayPulseControl = await prisma.pulseControl.findMany({
    where: {
      date: {
        gte: startOfTodayDay,
        lte: endOfTodayDay,
      },
    },
  });
  const beforePulseControl = await prisma.pulseControl.findMany({});
  const sortedBeforeBulseControl = sortByDate(beforePulseControl);
  const beforeBusleControlRow =
    sortedBeforeBulseControl.length > 0
      ? sortedBeforeBulseControl[sortedBeforeBulseControl.length - 1]
      : {}; //
  const beforeBusleControlRowTodayExisted =
    sortedBeforeBulseControl.length > 0
      ? sortedBeforeBulseControl[sortedBeforeBulseControl.length - 2]
      : {};
  const todayPulseControlRow =
    TodayPulseControl.length > 0 ? TodayPulseControl[0] : {};
  let pulseControl = {};
  if (TodayPulseControl.length > 0) {
    pulseControl = {
      id: todayPulseControlRow.id,
      before: todayPulseControlRow.before,
      after: todayPulseControlRow.after,
      date: new Date(),
    };
  } else {
    pulseControl = {
      id: beforeBusleControlRow.id,
      before: beforeBusleControlRow.after,
      after: 0,
      date: new Date(),
    };
  }
  return pulseControl;
};

export default getPulseControl;
