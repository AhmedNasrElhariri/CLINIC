import React from 'react';
import { ControlLabel } from 'rsuite';
import { FormGroup, FormControl } from 'rsuite';
import Label from '../label';
import { TextAreaStyled, InputGroupStyled } from './style';
import { Div } from 'components';

const CustomInput = ({ onChange, ...props }) => {
  return <TextAreaStyled onChange={e => onChange(e.target.value)} {...props} />;
};

export default ({
  label,
  children,
  borderless = false,
  importable = false,
  onImport,
  ...rest
}) => {
  return (
    <FormGroup>
      <ControlLabel>
        <Div display="flex" justifyContent="space-between" alignItems="center">
          <Label>{label}</Label>
          {importable && (
            <span onClick={onImport} style={{ cursor: 'pointer' }}>
              import
            </span>
          )}
        </Div>
      </ControlLabel>
      <InputGroupStyled borderless={borderless ? 1 : 0}>
        <FormControl {...rest} accepter={CustomInput} rows={5} />
      </InputGroupStyled>
    </FormGroup>
  );
};
