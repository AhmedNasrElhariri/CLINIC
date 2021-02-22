import React, { memo } from 'react';
import { FormGroup, RadioGroup, Radio, FormControl } from 'rsuite';
import styled, { css } from 'styled-components';
import Label from '../label';
const RadioStyled = styled(Radio)`
&&.rs-radio-checked .rs-radio-wrapper .rs-radio-inner::before {
  border-color: ${props => props.theme.colors.primary} ;
  background-color: ${props => props.theme.colors.primary} ;
}
`;
const CRRadio = ({ label, options, ...rest }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <FormControl accepter={RadioGroup} {...rest}>
        {options.map((o, index) => (
          <RadioStyled key={index} value={o.value || o} inline>
            {o.name || o}
          </RadioStyled>
        ))}
      </FormControl>
    </FormGroup>
  );
};

export default memo(CRRadio);
