import { prisma } from '@';
import bcrypt from 'bcryptjs';

import { APIExceptcion } from '@/services/erros.service';
import { POSITION } from '@/utils/constants';

const editUser = async (_, { user }, { userId, organizationId }) => {
  const currentUser = await prisma.user.findUnique({ where: { id: userId } });
  if (currentUser.position !== POSITION.Admin) {
    throw new APIExceptcion('not authorized user');
  }
  const { password, id, name, email, allowedViews } = user;
  const updatedUser = await prisma.user.findUnique({ where: { id: id } });
  const hashingPassword = bcrypt.hashSync(password, 10);
  return prisma.user.update({
    data: {
      name: name,
      email: email,
      allowedViews: allowedViews,
      password: hashingPassword,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
    where: {
      id,
    },
  });
};

export default editUser;
