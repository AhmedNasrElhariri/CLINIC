import { prisma } from '@';
import * as moment from 'moment';
const getPulseControl = async () => {
  const yestarDay = moment(new Date()).subtract(1, 'days').toDate();
  const startOfYestarDay = moment(yestarDay).startOf('day').toDate();
  const endOfYestarDay = moment(yestarDay).endOf('day').toDate();
  const startOfTodayDay = moment(new Date()).startOf('day').toDate();
  const endOfTodayDay = moment(new Date()).endOf('day').toDate();
  const yestardayPulseControl = await prisma.pulseControl.findMany({
    where: {
      date: {
        gte: startOfYestarDay,
        lte: endOfYestarDay,
      },
    },
  });
  const TodayPulseControl = await prisma.pulseControl.findMany({
    where: {
      date: {
        gte: startOfTodayDay,
        lte: endOfTodayDay,
      },
    },
  });
  const yestardayPulseControlRow = yestardayPulseControl[0];
  const todayPulseControlRow =
    TodayPulseControl.length > 0 ? TodayPulseControl[0] : {};
  let pulseControl = {};
  if (TodayPulseControl.length > 0) {
    pulseControl = {
      id: todayPulseControlRow.id,
      before: yestardayPulseControlRow.after,
      after: todayPulseControlRow.after,
      date: new Date(),
    };
  } else {
    pulseControl = yestardayPulseControlRow;
  }
  console.log(pulseControl);
  return pulseControl;
};

export default getPulseControl;
