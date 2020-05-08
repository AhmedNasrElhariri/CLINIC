import React from 'react';
import { FormGroup, Checkbox, FormControl } from 'rsuite';
import { ControlLabelStyled } from './style';

export default ({
  label,
  inline = true,
  block = false,
  formValue,
  onChange,
  name,
  ...rest
}) => {
  return (
    <FormGroup style={{ marginBottom: 12 }}>
      <Checkbox
        name={name}
        {...rest}
        style={{ width: '100%' }}
        checked={formValue[name]}
        onChange={onChange}
      />
    </FormGroup>
  );
};

// export default ({ label, inline = true, block = false, ...rest }) => {
//   console.log(rest);
//   return (
//     <FormGroup
//       style={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}
//     >
//       <ControlLabelStyled>{label}</ControlLabelStyled>
//       <FormControl accepter={Checkbox} {...rest}></FormControl>
//     </FormGroup>
//   );
// };
