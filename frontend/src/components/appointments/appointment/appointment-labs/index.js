import React from 'react';

import { Div } from 'components';
import useTestsDefinition from 'hooks/fetch-tests-definition';
import LabRow from './lab-row';
import useTimings from 'hooks/fetch-timing';
const Lab = ({ formValue, onChange }) => {
  const { labsDefinition } = useTestsDefinition();
  return (
    <Div>
      {labsDefinition.map((l, idx) => (
        <LabRow key={idx} lab={l} labsValue={formValue} onChange={onChange} />
      ))}
    </Div>
  );
};

export default Lab;
