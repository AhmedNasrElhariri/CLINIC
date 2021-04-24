import jwt from 'jsonwebtoken';
import * as R from 'ramda';
import { prisma } from '@';
import { APP_SECRET } from '@/utils/constants';
import { createAbility } from '@/services/ability.service';
import { isAdmin } from '@/services/ability.service';

export const getUserPayloads = request => {
  if (!request) {
    return {};
  }
  const authorizationHeader = request.get('authorization') || '';
  const token = authorizationHeader.replace('Bearer ', '');
  try {
    const { userId, organizationId } = jwt.verify(token, APP_SECRET);
    return {
      userId: userId,
      organizationId,
    };
  } catch (error) {
    return null;
  }
};

export const getUser = userId => {
  if (!userId) return null;
  const user = prisma.user.findUnique({ where: { id: userId } });
  return user;
};

export const getAbility = user => {
  const permissions = R.propOr([], 'permissions')(user);
  const ability = createAbility(permissions);
  return ability;
};

export const getContextData = async ({ request }) => {
  const { userId, organizationId } = getUserPayloads(request) || {};
  const user = await getUser(userId);
  const ability = getAbility(user);
  return {
    user,
    userId,
    organizationId,
    ability: getAbility(user),
    isAdmin: isAdmin(ability),
  };
};
