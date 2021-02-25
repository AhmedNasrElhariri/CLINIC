import { prisma } from '@';
import { APIExceptcion } from '@/services/erros.service';

const updateUserPermissions = async (
  _,
  { userId, permissions },
  { isAdmin }
) => {
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
