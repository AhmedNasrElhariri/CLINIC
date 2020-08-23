import { prisma } from '@';
import { APIExceptcion } from '@/services/erros.service';

const updateUserPermissions = async (
  _,
  { userId, permissions },
  { isAdmin }
) => {
  // FIXME also check if user belongs to same clinic of admin
  if (!isAdmin) {
    throw new APIExceptcion('not authroized');
  }

  prisma.user
    .update({
      data: {
        permissions,
      },
      where: {
        id: userId,
      },
    })
    .then(() => true)
    .catch(() => false);
};

export default updateUserPermissions;
