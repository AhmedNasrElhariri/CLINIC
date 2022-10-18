import React from 'react';
import Filter from 'components/filters/filter';
const BranchSpecialtyUserFilter = ({
  formValue,
  onChange,
  branches,
  formClassName,
}) => {
  return (
    <>
      <Filter
        formValue={formValue}
        onChange={onChange}
        branches={branches}
        formClassName={formClassName}
      />
    </>
  );
};

export default BranchSpecialtyUserFilter;
