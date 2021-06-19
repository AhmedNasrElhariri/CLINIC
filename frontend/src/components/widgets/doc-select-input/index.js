import React from 'react';
import { CRSelectInput } from 'components';
const CRDocSelectInput = ({ data, name, label, ...props }) => {
  const updatedData = data.map(d => {
    const id = d.id;
    let objName = d.name;
    if (d.permision.level === 'organization') {
      objName = objName + '/' + '(Organization)';
    } else if (d.permision.level === 'branch') {
      objName = objName + '/' + d.permision.branch.name + '(Branch)';
    } else if (d.permision.level === 'speciality') {
      objName = objName + '/' + d.permision.speciality.name + '(Speciality)';
    } else {
      objName = objName + '/' + d.permision.user.name + '(User)';
    }
    return {
      id: id,
      name: objName,
    };
  });
  return (
    <>
      <CRSelectInput name={name} label={label} data={updatedData}/>
    </>
  );
};
export default CRDocSelectInput;
