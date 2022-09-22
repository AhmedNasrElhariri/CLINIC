import { prisma } from '@';
import { APIExceptcion } from '@/services/erros.service';
import { POSITION } from '@/utils/constants';

const deleteBranch = async (_, { id }, { userId, organizationId }) => {
  const currentUser = await prisma.user.findUnique({ where: { id: userId } });
  if (currentUser.position !== POSITION.Admin) {
    throw new APIExceptcion('not authorized user');
  }

  await prisma.userSpecialty.deleteMany({ where: { branchId: id } });
  return prisma.branch.delete({ where: { id: id } }).then(() => true);
};

export default deleteBranch;
