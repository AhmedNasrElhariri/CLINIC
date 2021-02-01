import React ,{memo} from 'react';
import { Cascader, FormGroup } from 'rsuite'
import Label from '../label';

const CRNestedSelector = ({ label, data, formValue, onChange, name}) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Cascader
        onChange={value => onChange(formValue,formValue[name]=value)}
        data={data}
        style={{ width: '100%' }}
      />
    </FormGroup>
  );
};

export default memo(CRNestedSelector);
