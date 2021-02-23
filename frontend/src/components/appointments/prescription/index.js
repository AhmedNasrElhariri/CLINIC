import React from 'react';

import { Div } from 'components';
import useMedicinesDefinition from 'hooks/fetch-medicines-definition';
import MedicineRow from './medicine-row';

const Prescription = () => {
  const { medicines } = useMedicinesDefinition();

  return (
    <Div>
      {medicines.map((m, idx) => (
        <MedicineRow key={idx} {...m} />
      ))}
    </Div>
  );
};

export default Prescription;
