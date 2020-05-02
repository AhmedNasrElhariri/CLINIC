import React from 'react';
import { Button, SelectPicker } from 'rsuite';

import labTests from './lab-tests.js';
import { Div } from 'components';

const LabTest = ({ onChange, ...restProps }) => (
  <SelectPicker
    data={labTests}
    style={{ width: 300 }}
    {...restProps}
    onChange={onChange}
  />
);

export default function LabAndImagingTests({
  value: labTests,
  onChange: setLabTests,
  disabled,
}) {
  const addLabTest = () => setLabTests([...labTests, null]);
  const setTestValue = (val, idx) => {
    setLabTests([...labTests.slice(0, idx), val, ...labTests.slice(idx + 1)]);
  };
  return (
    <>
      {!disabled && (
        <Button color="orange" appearance="ghost" onClick={addLabTest}>
          Add Lab Test
        </Button>
      )}
      <Div>
        {labTests.map((lab, idx) => (
          <Div key={idx} my={2}>
            <LabTest
              value={lab}
              onChange={val => setTestValue(val, idx)}
              disabled={disabled}
            />
          </Div>
        ))}
      </Div>
    </>
  );
}
