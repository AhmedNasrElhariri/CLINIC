import { prisma } from '@';
import createDefaultView from '@/resolvers/mutation/create-default-view';

const seed = async () => {
  const users = await prisma.user.findMany({});

  users.forEach(user => {
    createDefaultView(null, null, { userId: user.id });
  });
};

export default seed;
