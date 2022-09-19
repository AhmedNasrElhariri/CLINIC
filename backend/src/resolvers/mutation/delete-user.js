import { prisma } from '@';
import { APIExceptcion } from '@/services/erros.service';
import { POSITION } from '@/utils/constants';

const deleteUser = async (_, { id }, { userId, organizationId }) => {
  const currentUser = await prisma.user.findUnique({ where: { id: userId } });
  if (currentUser.position !== POSITION.Admin) {
    throw new APIExceptcion('not authorized user');
  }
  return await prisma.user.delete({ where: { id } });
 
};

export default deleteUser;
