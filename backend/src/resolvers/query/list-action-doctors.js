import { listFlattenUsersTree } from '@/services/permission.service';
import { POSITION } from '@/utils/constants';

const listActionDoctors = async (_, { action }, { user, organizationId }) => {
  return listFlattenUsersTree({
    action,
    user,
    organizationId,
  }).then(doctors => doctors.filter(d => d.position === POSITION.Doctor));
};

export default listActionDoctors;
