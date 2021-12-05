import React, { useState } from 'react';
import { Checkbox } from 'rsuite';
import Range from './range';
import { Div } from 'components/widgets/html';
import { DAYS } from 'utils/constants';

const initValue = DAYS.map(d => ({
  checked: false,
}));

function WorkingHours() {
  const [formValue, setFormValue] = useState(initValue);

  const onChange = (value, idx) => {
    formValue[idx].checked = value;
    setFormValue([...formValue]);
  };
  return (
    <Div>
      {DAYS.map((d, idx) => (
        <Div display="flex" my={5} key={idx} mt={idx === 0 ? 0 : 5}>
          <Div width={80}>
            <Checkbox
              checked={formValue[idx].checked}
              onChange={(_, val) => onChange(val, idx)}
            >
              {d}
            </Checkbox>
          </Div>
          <Div flexGrow={1} px={4}>
            <Range disabled={!formValue[idx].checked} />
          </Div>
        </Div>
      ))}
    </Div>
  );
}

export default WorkingHours;
