import React from 'react';
import {
  ControlLabel,
  FormGroup,
  FormControl,
  InputNumber,
  Input,
} from 'rsuite';

import {
  NUMBER_FIELD_TYPE,
  TEXT_FIELD_TYPE,
  LONG_TEXT_FIELD_TYPE,
} from 'utils/constants';

const getAccepter = type => {
  switch (type) {
    case NUMBER_FIELD_TYPE:
      return InputNumber;
    case TEXT_FIELD_TYPE:
      return Input;
    case LONG_TEXT_FIELD_TYPE:
      return Input;
    default:
      return Input;
  }
};

const getExtraCutomProps = type => {
  switch (type) {
    case LONG_TEXT_FIELD_TYPE:
      return { componentClass: 'textarea', rows: 5 };
    default:
      return {};
  }
};

const InputField = ({ id, name, type, ...props }) => {
  return (
    <FormGroup style={{ maxWidth: 700 }}>
      <ControlLabel>{name}</ControlLabel>
      <FormControl
        name={name === 'totod' ? '92add961-5332-4788-a213-197be77e5c13' : name}
        {...props}
        accepter={getAccepter(type)}
        {...getExtraCutomProps(type)}
      />
    </FormGroup>
  );
};

export default InputField;
