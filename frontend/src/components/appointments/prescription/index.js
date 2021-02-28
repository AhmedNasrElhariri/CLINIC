import React from 'react';

import { Div } from 'components';
import useMedicinesDefinition from 'hooks/fetch-medicines-definition';
import MedicineRow from './medicine-row';
import useTimings from 'hooks/fetch-timing';
const Prescription = ({ formValue, onChange }) => {
  const { medicines } = useMedicinesDefinition();
  const { timings } = useTimings();
  let timingValues = [];
  timings.forEach(element => {
    let timingRow = {
      label: element.name,
      value: element.printValue,
    };
    timingValues.push(timingRow);
  });
  return (
    <Div>
      {medicines.map((m, idx) => (
        <MedicineRow
          key={idx}
          {...m}
          timings={timingValues}
          medicineValue={formValue}
          onChange={onChange}
        />
      ))}
    </Div>
  );
};

export default Prescription;
