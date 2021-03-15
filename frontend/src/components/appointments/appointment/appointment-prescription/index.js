import React, { useMemo, useState, useEffect, useCallback } from 'react';

import { Div } from 'components';
import MedicineRow from './medicine-row';
import useTimings from 'hooks/fetch-timing';
import useMedicinesDefinition from 'hooks/fetch-medicines-definition';
import useImagesDefinition from 'hooks/fetch-images-definition';

const arabicDuration = [
  { label: 'سنه', value: 'سنه' },
  { label: 'شهر', value: 'شهر' },
  { label: 'اسبوع', value: 'اسبوع' },
  { label: 'يوم', value: 'يوم' },
];
const englishDuration = [
  { label: 'Year', value: 'year' },
  { label: 'Month', value: 'month' },
  { label: 'Week', value: 'week' },
  { label: 'Day', value: 'day' },
];

const Prescription = ({ prescription, onChange }) => {
  // const { imagesDefinition } = useImagesDefinition();
  const { medicines } = useMedicinesDefinition();
  const [formValue, setFormValue] = useState([]);
  const { timings } = useTimings();

  useEffect(() => {
    const selectedMedicines = prescription.map(p => p.medicineId);
    const newFormValue = medicines.map(l => ({
      ...l,
      required: selectedMedicines.includes(l.id),
    }));
    setFormValue(newFormValue);
  }, [medicines, prescription]);

  const handleOnClick = useCallback(
    ({ id, required }) => {
      const newState = !required;
      const selectedImageIds = formValue
        .filter(lf => (lf.id === id ? newState : lf.required))
        .map(lf => lf.id);

      onChange(selectedImageIds);
    },
    [formValue, onChange]
  );

  // const arabicTimingValues = useMemo(
  //   () =>
  //     timings.map(element => {
  //       return {
  //         label: element.name,
  //         value: element.arabicPrintValue,
  //       };
  //     }),
  //   [timings]
  // );
  // const englishTimingValues = useMemo(
  //   () =>
  //     timings.map(element => {
  //       return {
  //         label: element.name,
  //         value: element.englishPrintValue,
  //       };
  //     }),
  //   [timings]
  // );

  return (
    <>
      <Div>
        {medicines.map((m, idx) => (
          <MedicineRow
            key={idx}
            {...m}
            // periodDuration={arabicEnable ? arabicDuration : englishDuration}
            // timings={arabicEnable ? arabicTimingValues : englishTimingValues}
            medicineValue={formValue}
            onChange={onChange}
          />
        ))}
      </Div>
    </>
  );
};

export default Prescription;
