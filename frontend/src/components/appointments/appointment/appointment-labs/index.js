import React, { useState, useEffect, useCallback } from 'react';

import { Div } from 'components';
import { useLabDefinitions } from 'hooks';
import LabRow from './lab-row';

const AppointmentLabs = ({ selectedLabs, onChange, categoryId }) => {
  
  const { labsDefinition } = useLabDefinitions({ categoryId });
  const [formValue, setFormValue] = useState([]);

  useEffect(() => {
    const newFormValue = labsDefinition.map((l, idx) => ({
      ...l,
      required: selectedLabs.includes(l.id),
    }));
    setFormValue(newFormValue);
  }, [labsDefinition, selectedLabs]);

  const handleOnClick = useCallback(
    ({ id, required }) => {
      const newState = !required;
      const selectedLabsIds = formValue
        .filter(lf => (lf.id === id ? newState : lf.required))
        .map(lf => lf.id);
      onChange(selectedLabsIds);
    },
    [formValue, onChange]
  );

  return (
    <Div>
      {formValue.map((f, idx) => (
        <LabRow key={idx} lab={f} onClick={() => handleOnClick(f)} />
      ))}
    </Div>
  );
};

export default AppointmentLabs;
