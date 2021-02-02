import React ,{memo} from 'react';
import { FormGroup, RadioGroup ,Radio, FormControl} from 'rsuite';
import Label from '../label';

const CRRadio = ({ label, options,...rest}) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
        <RadioGroup
          inline
          style={{ width: '100%' }}
          {...rest}
        >
          {options.map(o => (
              <Radio value={o.value}>{o.name}</Radio>
          ))}
        </RadioGroup>
    </FormGroup>
  );
};

export default memo(CRRadio);
