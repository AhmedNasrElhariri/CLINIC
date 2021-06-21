import React from 'react';
import { CRSelectInput } from 'components';
const CRDocSelectInput = ({ data, name, label, ...rest }) => {
  const updatedData = data.map(d => {
    let objName = d.Apptype || d.name;
    if (d.level === 'organization') {
      objName = objName + '/' + '(Organization)';
    } else if (d.level === 'branch') {
      objName = objName + '/' + d.branch.name + '(Branch)';
    } else if (d.level === 'speciality') {
      objName = objName + '/' + d.speciality.name + '(Speciality)';
    } else {
      objName = objName + '/' + d.user.name + '(User)';
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
