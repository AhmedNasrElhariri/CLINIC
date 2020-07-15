import React from 'react';
import { ButtonGroupStyled, ButtonStyled } from './style';

const ButtonGroup = ({ children, onSelect, activeKey }) => (
  <ButtonGroupStyled>
    {React.Children.map(children, child =>
      React.cloneElement(child, {
        active: activeKey === child.props.eventKey,
        onClick: () => onSelect(child.props.eventKey),
      })
    )}
  </ButtonGroupStyled>
);

ButtonGroup.CRButton = ButtonStyled;

export default ButtonGroup;
