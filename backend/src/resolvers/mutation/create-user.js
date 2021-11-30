import { prisma } from '@';
import bcrypt from 'bcryptjs';

import { APIExceptcion } from '@/services/erros.service';
import { POSITION } from '@/utils/constants';

const createUser = async (_, { user }, { userId, organizationId }) => {
  const org = await prisma.organization.findUnique({
    where: {
      id: organizationId,
    },
  });
  const { maxNumberOfUsers } = org;
  const allOrgUsersNumber = await prisma.user.count({
    where: {
      organizationId,
    },
  });
  if (allOrgUsersNumber >= maxNumberOfUsers) {
    throw new APIExceptcion(
      'you have reached the maximum number of users. please call clinicR specialties '
    );
  }
  const currentUser = await prisma.user.findUnique({ where: { id: userId } });
  if (currentUser.position !== POSITION.Admin) {
    throw new APIExceptcion('not authorized user');
  }
  const { password, id, ...rest } = user;
  const hashingPassword = bcrypt.hashSync(password, 10);
  return prisma.user.create({
    data: {
      ...rest,
      password: hashingPassword,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default createUser;
