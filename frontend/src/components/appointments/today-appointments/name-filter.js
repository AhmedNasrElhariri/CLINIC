import { Form } from 'rsuite';
import { CRTextInput } from 'components';
import { useState } from 'react';
const Filter = ({ t, filter, setFilter }) => {
  const [patientInternalValue, setPatientInternalValue] = useState('');

  return (
    <Form style={{ marginLeft: '10px', marginTop: '-10px' }}>
      <CRTextInput
        placeholder="Insert at leaset 6 numbers or 3 characters"
        value={patientInternalValue}
        onChange={value => {
          const pattern = /^(010|011|012|015)\d{3,}|(?!(010|011|012|015)).{3,}/;
          if (pattern.test(value) || !value) {
            setFilter({ ...filter, patient: value });
          }
          setPatientInternalValue(value);
        }}
      />
    </Form>
  );
};
export default Filter;
