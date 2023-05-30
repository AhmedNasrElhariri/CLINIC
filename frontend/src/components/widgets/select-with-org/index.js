import React, { useMemo } from 'react';
import { CRSelectInput } from 'components';
const CRDocSelectInput = ({
  data,
  name,
  branchId = null,
  specialtyId = null,
  userId = null,
  label,
  ...rest
}) => {
  const selectedData = useMemo(() => {
    let lastData = [];
    if (branchId != null && specialtyId == null && userId == null) {
      lastData = data?.filter(
        i => i.level === 'branch' && i?.branch?.id === branchId
      );
    } else if (specialtyId != null && userId == null) {
      lastData = data.filter(
        i => i.level === 'specialty' && i.specialty.id === specialtyId
      );
    } else if (userId != null) {
      lastData = data.filter(i => i.level === 'user' && i.user.id === userId);
    } else {
      lastData = data.filter(i => i.level === 'organization');
    }
    return lastData.map(i => ({ name: i.name, id: i }));
  }, [branchId, specialtyId, userId, data]);

  return (
    <>
      <CRSelectInput name={name} label={label} data={selectedData} {...rest} />
    </>
  );
};
export default CRDocSelectInput;
