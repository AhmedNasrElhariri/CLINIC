import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'rsuite';
import { CRTextInput, CRDatePicker } from 'components/widgets';

const initValue = {
  medicineName: '',
  frequency: '',
  dose: '',
  fromDate: null,
};

function NewMedicalHistory({ onChange }) {
  const [formValue, setFormValue] = useState(initValue);

  const handleChange = useCallback(
    newVal => {
      setFormValue(newVal);
      onChange(newVal);
    },
    [onChange]
  );

  return (
    <Form formValue={formValue} onChange={handleChange} fluid>
      <CRTextInput name="medicineName" label="Medicine" />
      <CRTextInput name="frequency" label="Frequency" />
      <CRTextInput name="dose" label="Dose" />
      <CRDatePicker name="fromDate" label="From" block />
    </Form>
  );
}

NewMedicalHistory.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default memo(NewMedicalHistory);
