import React from 'react';
import Filter from 'components/filters/filter';
const BranchSpecialtyUserFilter = ({ formValue, onChange, branches }) => {
  return (
    <>
      <Filter formValue={formValue} onChange={onChange} branches={branches} />
    </>
  );
};

export default BranchSpecialtyUserFilter;
