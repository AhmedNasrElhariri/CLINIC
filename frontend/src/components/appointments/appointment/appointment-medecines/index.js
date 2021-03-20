import React, { useState, useEffect, useCallback } from 'react';
import * as R from 'ramda';

import { Div } from 'components';
import MedicineRow from './medicine-row';
import useTimings from 'hooks/fetch-timing';
import useMedicinesDefinition from 'hooks/fetch-medicines-definition';

const AppointmentMedicines = ({ prescription, onChange }) => {
  const { medicineDefinitions } = useMedicinesDefinition();
  const [formValue, setFormValue] = useState([]);
  const { timings } = useTimings();

  useEffect(() => {
    const newFormValue = medicineDefinitions.map((m, idx) => {
      const formMedicine = prescription.find(f => f.medicineId === m.id) || {};
      const { dose, medicineId, timingId, duration, period } = formMedicine;
      return {
        medicine: m,
        dose: dose || undefined,
        timingId: timingId || null,
        medicineId: medicineId || m.id || null,
        duration: duration || undefined,
        period: period || null,
        required: !R.isEmpty(formMedicine),
      };
    });
    setFormValue(newFormValue);
  }, [medicineDefinitions, prescription]);

  const handleOnClick = useCallback(
    ({ required }, idx) => {
      const newState = !required;
      const prescription = formValue
        .filter((lf, index) => (index === idx ? newState : lf.required))
        .map(lf =>
          R.pick(['dose', 'timingId', 'medicineId', 'duration', 'period'])(lf)
        );
      console.log(prescription);
      onChange(prescription);
    },
    [formValue, onChange]
  );

  const handleOnChange = useCallback((val, idx) => {
    setFormValue(formValue => {
      const newFormVal = formValue.map((f, index) => (index === idx ? val : f));
      return newFormVal;
    });
  }, []);

  return (
    <Div>
      {/* <MedicinesFilter onNameChange={() => {}}></MedicinesFilter> */}
      <Div>
        {formValue.map((f, idx) => (
          <MedicineRow
            timings={timings}
            key={idx}
            medicine={f.medicine}
            onClick={() => handleOnClick(f, idx)}
            onChange={val => handleOnChange(val, idx)}
            formValue={f}
          />
        ))}
      </Div>
    </Div>
  );
};

export default AppointmentMedicines;
