import React, { useState } from 'react';
import moment from 'moment';
import { Checkbox, Button } from 'rsuite';

import Range from './range';
import { Div } from 'components/widgets';
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
    <>
      <Div>
        {DAYS.map((d, idx) => (
          <Div display="flex" my={5} key={idx} mt={idx === 0 ? 0 : 5}>
            <Div width={80}>
              <Checkbox
                checked={formValue[idx].checked}
                onChange={(_, val) => onToggleCheck(val, idx)}
              >
                {d}
              </Checkbox>
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
      <Div>
        <Button appearance="primary">Save</Button>
      </Div>
    </>
  );
}

export default WorkingHours;
