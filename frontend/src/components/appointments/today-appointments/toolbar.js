import { Div } from 'components/widgets';
import React from 'react';

import Filter from './filter';

export default function toolbar({
  formValue,
  onChange,
  doctors,
  specializations,
}) {
  return (
    <Div padding={20} wd>
      <Div mb={4}>
        <Filter
          formValue={formValue}
          onChange={onChange}
          doctors={doctors}
          specializations={specializations}
        />
      </Div>
    </Div>
  );
}
