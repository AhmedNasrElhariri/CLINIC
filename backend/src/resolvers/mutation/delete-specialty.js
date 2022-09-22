import { prisma } from '@';
import { APIExceptcion } from '@/services/erros.service';
import { POSITION } from '@/utils/constants';

const deleteSpecialty = async (_, { id }, { userId, organizationId }) => {
  const currentUser = await prisma.user.findUnique({ where: { id: userId } });
  if (currentUser.position !== POSITION.Admin) {
    throw new APIExceptcion('not authorized user');
  }

  await prisma.userSpecialty.deleteMany({ where: { specialtyId: id } });
  return prisma.specialty.delete({ where: { id: id } }).then(() => true);
};

export default deleteSpecialty;
