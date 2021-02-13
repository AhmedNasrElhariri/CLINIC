import { listFlattenUsersTree } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';

const hello = async () => {
  await listFlattenUsersTree({
    userId: 'b1704e5f-c0d5-4ee7-bf14-6963adda907a',
    organizationId: '47202e8c-86e3-11ea-bc55-0242ac130003',
    action: ACTIONS.Create_Appointment,
  });
  return true;
};

export default hello;
