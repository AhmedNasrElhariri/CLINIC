import React from 'react';

import { Div } from 'components';
import useTestsDefinition from 'hooks/fetch-tests-definition';
import LabRow from './lab-row';
import useTimings from 'hooks/fetch-timing';
const Lab = ({ formValue, onChange }) => {
  const { testsDefinition } = useTestsDefinition();
  return (
    <Div>
      {testsDefinition.map((t, idx) => (
        <LabRow key={idx} lab={t} labsValue={formValue} onChange={onChange} />
      ))}
    </Div>
  );
};

export default Lab;
