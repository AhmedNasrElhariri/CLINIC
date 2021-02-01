import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'rsuite';
import { CRTextInput } from 'components/widgets';

const initValue = {
  disease: '',
  relative: '',
};

function NewMedicineHistory({ onChange }) {
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

NewMedicineHistory.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default memo(NewMedicineHistory);
