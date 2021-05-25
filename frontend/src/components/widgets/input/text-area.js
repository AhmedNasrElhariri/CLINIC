import React, { useState } from 'react';

import { FormGroup, FormControl } from 'rsuite';
import Label from '../label';
import { TextAreaStyled, InputGroupStyled, ImportButtonStyled } from './style';
import { Div } from 'components';

import SnippetsModal from './import-snippet';

const CustomInput = ({ onChange, importable, ...props }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TextAreaStyled onChange={e => onChange(e.target.value)} {...props} />
      {importable && (
        <Div textAlign="right" pr={2}>
          <ImportButtonStyled onClick={() => setVisible(true)}>
            import
          </ImportButtonStyled>
        </Div>
      )}
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

const CRTextArea = ({
  label,
  children,
  rows,
  borderless = false,
  importable = false,
  ...rest
}) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <InputGroupStyled borderless={borderless ? 1 : 0} autoHeight>
        <FormControl
          {...rest}
          accepter={CustomInput}
          importable={importable}
          rows={rows}
        />
      </InputGroupStyled>
    </FormGroup>
  );
};

CRTextArea.defaultProps = {
  rows: 5,
};

export default CRTextArea;
