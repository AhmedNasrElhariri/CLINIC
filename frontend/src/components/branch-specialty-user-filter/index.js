import React from 'react';
import Filter from 'components/filters/filter';
const BranchSpecialtyUserFilter = ({
  formValue,
  onChange,
  branches,
  formClassName,
  todayApp,
  cleanable,
}) => {
  return (
    <>
      <Filter
        formValue={formValue}
        onChange={onChange}
        branches={branches}
        formClassName={formClassName}
        todayApp={todayApp}
        cleanable={cleanable}
      />
    </>
  );
};

export default BranchSpecialtyUserFilter;
