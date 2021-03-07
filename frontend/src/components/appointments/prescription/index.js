import React, { useMemo, useState } from 'react';

import { Div } from 'components';
import MedicineRow from './medicine-row';
import useTimings from 'hooks/fetch-timing';

const Prescription = ({ formValue, onChange, arabicEnable,medicines }) => {
  
  const { timings } = useTimings();
  const arabicTimingValues = useMemo(
    () =>
      timings.map(element => {
        return {
          label: element.name,
          value: element.arabicPrintValue,
        };
      }),
    [timings]
  );
  const englishTimingValues = useMemo(
    () =>
      timings.map(element => {
        return {
          label: element.name,
          value: element.englishPrintValue,
        };
      }),
    [timings]
  );
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

  
  return (
    <>
      <Div>
        {medicines.map((m, idx) => (
          <MedicineRow
            key={idx}
            {...m}
            periodDuration={arabicEnable ? arabicDuration : englishDuration}
            timings={arabicEnable ? arabicTimingValues : englishTimingValues}
            medicineValue={formValue}
            onChange={onChange}
          />
        ))}
      </Div>
    </>
  );
};

export default Prescription;
