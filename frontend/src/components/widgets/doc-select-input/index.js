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
        i => i.level === 'branch' && i?.branch?.id == branchId
      );
    } else if (specialtyId != null && userId == null) {
      lastData = data.filter(
        i => i.level === 'specialty' && i.specialty.id == specialtyId
      );
    } else if (userId != null) {
      lastData = data.filter(i => i.level === 'user' && i.user.id == userId);
    } else {
      lastData = data;
    }
    return lastData;
  }, [branchId, specialtyId, userId,data]);
  const updatedData = selectedData?.map(d => {
    let objName = d?.Apptype || d?.name;
    if (d.level === 'organization') {
      objName = objName + '/' + '(Organization)';
    } else if (d.level === 'branch') {
      objName = objName + '/' + d?.branch?.name + '(Branch)';
    } else if (d.level === 'specialty') {
      objName = objName + '/' + d?.specialty?.name + '(Speciality)';
    } else {
      objName = objName + '/' + d?.user?.name + '(User)';
    }
    return {
      id: d,
      name: objName,
    };
  });
  return (
    <>
      <CRSelectInput name={name} label={label} data={updatedData} {...rest} />
    </>
  );
};
export default CRDocSelectInput;
