

import { ACTIONS_ORGANZATIONONLY } from 'utils/constants';

export const PermissionExist = id => {
  let exist = false;
  if (ACTIONS_ORGANZATIONONLY.includes(id)) {
    exist = true;
  }
  return exist;
};
