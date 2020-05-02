import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber, FormGroup, FormControl, ControlLabel } from 'rsuite';

import { Div } from 'components';

const ControlledInput = ({
  name,
  label,
  values,
  accepter,
  onChange,
  disabled,
}) => (
  <FormGroup>
    <ControlLabel>{label}</ControlLabel>
    <FormControl
      accepter={accepter}
      onChange={val => onChange(name, val)}
      value={values[name]}
      disabled={disabled}
    ></FormControl>
  </FormGroup>
);

ControlledInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  accepter: PropTypes.elementType.isRequired,
};

const vitalDataList = [
  { name: 'weight', label: 'Weight' },
  { name: 'height', label: 'Height' },
  { name: 'pulse', label: 'Pulse' },
  { name: 'temp', label: 'Temp' },
  { name: 'glucoseLevel', label: 'Glucose Level' },
];

export default function VitalData({ value, onChange, disabled }) {
  const change = (type, val) => {
    onChange({ ...value, [type]: val });
  };
  return (
    <Div width={320}>
      {vitalDataList.map(({ name, label }, idx) => (
        <ControlledInput
          key={idx}
          name={name}
          label={label}
          values={value}
          onChange={change}
          accepter={InputNumber}
          disabled={disabled}
        />
      ))}
    </Div>
  );
}
