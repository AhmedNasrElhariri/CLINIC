import React, { useState } from 'react';

import { FormGroup, FormControl } from 'rsuite';
import Label from '../label';
import { TextAreaStyled, InputGroupStyled } from './style';

import SnippetsModal from './import-snippet';

const CustomInput = ({ onChange, importable, ...props }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {importable && (
        <span
          onClick={() => setVisible(true)}
          style={{ cursor: 'pointer', marginLeft: 10 }}
        >
          import
        </span>
      )}
      <TextAreaStyled onChange={e => onChange(e.target.value)} {...props} />
      <SnippetsModal
        show={visible}
        onOk={text => {
          onChange(text);
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
      />
    </>
  );
};

export default ({
  label,
  children,
  borderless = false,
  importable = false,
  ...rest
}) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <InputGroupStyled borderless={borderless ? 1 : 0}>
        <FormControl
          {...rest}
          accepter={CustomInput}
          importable={importable}
          rows={5}
        />
      </InputGroupStyled>
    </FormGroup>
  );
};
