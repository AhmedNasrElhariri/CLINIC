import React from 'react';
import { Div } from 'components/widgets';

import Filter from './filter';

export default function toolbar({
  formValue,
  onChange,
  branches,
  doctors,
  specialties,
}) {
  return (
    <Div padding={20} wd>
      <Div mb={4}>
        <Filter
          formValue={formValue}
          onChange={onChange}
          branches={branches}
          doctors={doctors}
          specialties={specialties}
        />
      </Div>
    </Div>
  );
}
