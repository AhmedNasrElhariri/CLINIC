import React ,{memo} from 'react';
import { FormGroup} from 'rsuite';
import { CheckboxGroup ,Checkbox } from 'rsuite'
import Label from '../label';

const CRCheckBox = ({ label, checkBoxValues, formValue, onChange, name}) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <CheckboxGroup
        inline
        style={{ width: '100%' }}
        onChange={value => onChange(formValue,formValue[name]=value)}
      >
        {checkBoxValues.map(checkbox => (
              <Checkbox value={checkbox.value}>{checkbox.name}</Checkbox>
        ))}
      </CheckboxGroup>
    </FormGroup>
  );
};

export default memo(CRCheckBox);
