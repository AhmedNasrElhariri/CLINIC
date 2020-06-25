import React, { useState } from 'react';
import { Toggle } from 'rsuite';

import Range from './range';
import { CRCard, Div, H6 } from 'components';
import { DAYS } from 'utils/constants';

const initValue = DAYS.map(d => ({
  checked: false,
  value: [360, 600],
}));

function WorkingHours() {
  const [formValue, setFormValue] = useState(initValue);

  const onToggleCheck = (value, idx) => {
    formValue[idx].checked = value;
    setFormValue([...formValue]);
  };

  const onRangeChange = (value, idx) => {
    formValue[idx].value = value;
    setFormValue([...formValue]);
  };

  return (
    <CRCard borderless>
      <Div py={30}>
        {DAYS.map((day, idx) => (
          <Div
            display="flex"
            my={5}
            key={idx}
            mt={idx === 0 ? 0 : 5}
            alignItems="flex-end"
          >
            <Div width={140} display="flex">
              <Toggle
                checked={formValue[idx].checked}
                onChange={val => onToggleCheck(val, idx)}
              />
              <H6 ml={2}>{day}</H6>
            </Div>
            <Div flexGrow={1} px={4}>
              <Range
                disabled={!formValue[idx].checked}
                value={formValue[idx].value}
                onChange={val => onRangeChange(val, idx)}
              />
            </Div>
          </Div>
        ))}
      </Div>
    </CRCard>
  );
}

export default WorkingHours;
