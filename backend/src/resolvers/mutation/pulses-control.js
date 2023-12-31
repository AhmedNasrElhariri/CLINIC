import { prisma } from '@';
import * as moment from 'moment';
const addPulsesControl = async (_, { pulsesControl: pulseControlData }) => {
  const startOfDay = moment(new Date()).startOf('day').toDate();
  const endOfDay = moment(new Date()).endOf('day').toDate();
  const pulseControlRow = await prisma.pulseControl.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });
  const pulse = pulseControlRow[0];
  if (pulseControlRow.length > 0) {
    return prisma.pulseControl.update({
      data: {
        ...pulseControlData,
        date: new Date(),
      },
      where: {
        id: pulse.id,
      },
    });
  } else {
    return prisma.pulseControl.create({
      data: {
        ...pulseControlData,
        date: new Date(),
      },
    });
  }
};

export default addPulsesControl;
