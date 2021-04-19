import { prisma } from '@';

const addPulsesControl = async (_, { pulsesControl }) => {
  return prisma.pulseControl.create({
    data: {
      ...pulsesControl,
    },
  });
};

export default addPulsesControl;
