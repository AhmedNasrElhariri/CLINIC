import { prisma } from '@';
import { getUserPayloads } from '@/services/auth.service';

const login = async (_, __, { request }) => {
  const { userId } = getUserPayloads(request);
  const user = await prisma.user.findOne({ where: { id: userId } });
  return user;
};

export default login;
