import { POSITION } from '@/utils/constants';
import { prisma } from '@';
import * as R from 'ramda';

const permissionLevel = async (action, user, organizationId) => {
  if (user.position === POSITION.Admin) {
    return { isOrganizationLevel: true };
  }
  const role = await prisma.user.findUnique({ where: { id: user.id } }).role({
    include: {
      permissions: {
        where: {
          action,
        },
      },
    },
  });

  const permission = R.pathOr(null, ['permissions', '0'])(role);

  if (!permission) {
    return { isOrganizationLevel: false };
  }

  const { level } = permission;
  if (level == 'Organization') {
    return { isOrganizationLevel: true };
  }
  return { isOrganizationLevel: false };
};
export default permissionLevel;
