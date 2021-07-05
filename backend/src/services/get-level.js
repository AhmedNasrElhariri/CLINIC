import { LEVEL } from '@/utils/constants';
export const GetLevel = (branchId, specialtyId, userId) => {
  let level = '';
  if (branchId == null && specialtyId == null && userId == null) {
    level = LEVEL.ORGANIZATION;
  } else if (userId != null  ) {
    level = LEVEL.USER;
  } else if (specialtyId != null && userId == null) {
    level = LEVEL.SPECIALTY;
  } else {
    level = LEVEL.BRANCH;
  }
  return level;
};
