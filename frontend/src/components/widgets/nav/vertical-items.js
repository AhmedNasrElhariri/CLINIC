import React, { useCallback } from 'react';
import { Nav } from 'rsuite';
import styled, { css } from 'styled-components';
import { Div } from 'components/widgets';

const activeStyles = css`
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #50c7f2;
`;

const ItemStyled = styled(Div)`
  font-family: SegoeUI;
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #b6b7b7;
  align-items: center;
  cursor: pointer;
  width: 151px;
  padding: 12px 25px;
  background-color: #ffffff;
  position: relative;
  ${props => (props.active ? activeStyles : '')}
`;

export default ({ children, active, onSelect, eventKey, ...props }) => {
  const select = useCallback(e => onSelect(eventKey, e), [eventKey, onSelect]);
  return (
    <Nav.Item
      {...props}
      renderItem={() => (
        <ItemStyled onClick={select} active={active}>
          {children}
        </ItemStyled>
      )}
    />
  );
};
