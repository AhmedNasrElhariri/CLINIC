import React from 'react';
import { Div } from 'components/widgets';

import Filter from './filter';

export default function toolbar({
  formValue,
  onChange,
  branches,
  doctors,
  specializations,
}) {
  return (
    <Div padding={20} wd>
      <Div mb={4}>
        <Filter
          formValue={formValue}
          onChange={onChange}
          branches={branches}
          doctors={doctors}
          specializations={specializations}
        />
      </Div>
    </Div>
  );
}
