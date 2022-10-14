import React, { useState, useEffect, useCallback, useMemo } from 'react';
import * as R from 'ramda';

import { Div } from 'components';
import MedicineRow from './medicine-row';
import { useTimings } from 'hooks';
const existedMed = (id, prescription) => {
  let exist = false;
  prescription.forEach(element => {
    if (element.medicineId === id) {
      exist = true;
    }
  });
  return exist;
};
const AppointmentMedicines = ({
  prescription,
  medicineDefinitions,
  selectedMedicines,
  onChange,
}) => {
  const [formValue, setFormValue] = useState([]);
  const { timings } = useTimings();
  const finalMedicines = useMemo(() => {
    const meds = medicineDefinitions.filter(m => {
      if (selectedMedicines.includes(m.id) || existedMed(m.id, prescription)) {
        return m;
      }
    });
    return meds;
  }, [selectedMedicines, prescription, medicineDefinitions]);
  useEffect(() => {
    const newFormValue = finalMedicines.map((m, idx) => {
      const formMedicine = prescription.find(f => f.medicineId === m.id) || {};
      const { dose, medicineId, timingId, duration, period } = formMedicine;
      return {
        medicine: m,
        dose: dose || undefined,
        timingId: timingId || null,
        medicineId: medicineId || m.id || null,
        duration: duration || '',
        period: period || null,
        required: !R.isEmpty(formMedicine),
      };
    });
    setFormValue(newFormValue);
  }, [finalMedicines, prescription]);

  const handleOnClick = useCallback(
    ({ required }, idx) => {
      const newState = !required;
      const prescription = formValue
        .filter((lf, index) => (index === idx ? newState : lf.required))
        .map(lf =>
          R.pick(['dose', 'timingId', 'medicineId', 'duration', 'period'])(lf)
        );
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
    <div className="bg-slate-100 overflow-x-auto pb-5 px-4 mt-7">
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
    </div>
  );
};

export default AppointmentMedicines;
