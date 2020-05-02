import { prisma } from '@';
import * as R from 'ramda';

const vitalData = appointment => {
  return R.pick(['weight', 'height', 'pulse', 'temp', 'glucoseLevel'])(
    appointment
  );
};

export default vitalData;
