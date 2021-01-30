import { prisma } from '@';

const getActions = () => {
  return prisma.action.findMany({});
};

export default getActions;
