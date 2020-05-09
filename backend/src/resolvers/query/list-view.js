import { prisma } from '@';

const listView = () => {
  return prisma.fieldGroup.findMany({ include: { fields: true } });
};

export default listView;
