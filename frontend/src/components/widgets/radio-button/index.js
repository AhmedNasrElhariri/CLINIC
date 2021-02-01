import React ,{memo} from 'react';
import { FormGroup, RadioGroup ,Radio, FormControl} from 'rsuite';
import Label from '../label';

const CRRadio = ({ label, medicineFormValues, formValue, onChange, name}) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
        <RadioGroup
          inline
          style={{ width: '100%' }}
          onChange={value => onChange(formValue,formValue[name]=value)}
        >
          {medicineFormValues.map(radioButto => (
              <Radio value={radioButto.value}>{radioButto.name}</Radio>
          ))}
        </RadioGroup>
    </FormGroup>
  );
};

export default memo(CRRadio);
