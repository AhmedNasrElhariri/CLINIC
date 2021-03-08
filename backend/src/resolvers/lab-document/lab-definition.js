import { prisma } from '@';
import patient from './patient';

const labDefinition = ({id}) => {
  return prisma.labDocument.findOne({
    where: {
      id
    },
  }).labDefinition()
};

export default labDefinition;
