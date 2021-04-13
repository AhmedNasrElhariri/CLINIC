import { listFlattenUsersTree } from '@/services/permission.service';

const listActionUsers = async (_, { action }, { user, organizationId }) => {
  return listFlattenUsersTree({
    action,
    user,
    organizationId,
  });
};

export default listActionUsers;
