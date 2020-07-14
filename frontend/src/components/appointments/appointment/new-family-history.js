import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'rsuite';
import { CRTextInput, CRDatePicker } from 'components/widgets';

const initValue = {
  disease: '',
  relative: '',
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
      <CRTextInput name="disease" label="Disease" />
      <CRTextInput name="relative" label="Relative" />
    </Form>
  );
}

NewMedicalHistory.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default memo(NewMedicalHistory);
