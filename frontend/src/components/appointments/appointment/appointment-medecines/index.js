import React, { useState, useEffect, useCallback } from 'react';

import { Div } from 'components';
import MedicineRow from './medicine-row';
import useTimings from 'hooks/fetch-timing';
import useMedicinesDefinition from 'hooks/fetch-medicines-definition';

const AppointmentMedicines = ({ selectedMedicines, onChange }) => {
  const { medicineDefinitions } = useMedicinesDefinition();
  const [formValue, setFormValue] = useState([]);
  const { timings } = useTimings();

  useEffect(() => {
    const newFormValue = medicineDefinitions.map((l, idx) => ({
      ...l,
      required: selectedMedicines.includes(l.id),
    }));
    setFormValue(newFormValue);
  }, [medicineDefinitions, selectedMedicines]);

  const handleOnClick = useCallback(
    ({ id, required }) => {
      const newState = !required;
      const selectedMedicinesIds = formValue
        .filter(lf => (lf.id === id ? newState : lf.required))
        .map(lf => lf.id);

      onChange(selectedMedicinesIds);
    },
    [formValue, onChange]
  );

  return (
    <Div>
      {/* <MedicinesFilter onNameChange={() => {}}></MedicinesFilter> */}
      <Div>
        {formValue.map((f, idx) => (
          <MedicineRow
            timings={timings}
            key={idx}
            medicine={f}
            onClick={() => handleOnClick(f)}
          />
        ))}
      </Div>
    </Div>
  );
};

export default AppointmentMedicines;
