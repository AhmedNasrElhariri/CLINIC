import { LEVEL } from '@/utils/constants';
export const GetLevel = (branchId, specialtyId, userId) => {
  let level = '';
  if (branchId == null && specialtyId == null && userId == null) {
    level = LEVEL.ORGANIZATION;
  } else if (branchId != null) {
    level = LEVEL.BRANCH;
  } else if (branchId == null && specialtyId != null) {
    level = LEVEL.SPECIALTY;
  } else {
    level = LEVEL.USER;
  }
  return level;
};
