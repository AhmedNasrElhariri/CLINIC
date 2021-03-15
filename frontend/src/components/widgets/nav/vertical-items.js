import { ifElse } from 'ramda';
import React, { useCallback } from 'react';
import { Nav } from 'rsuite';
import styled, { css } from 'styled-components';
import { Div } from 'components/widgets';

const activeStyles = css`
  color: #50c7f2;
  cursor: auto;
  font-weight: 800;
`;

const ItemStyled = styled(Div)`
  font-family: SegoeUI;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.31;
  letter-spacing: normal;
  text-align: center;
  color: #283148;
  align-items: center;
  cursor: pointer;
  width: 151px;
  padding: 15px 0px 14px 0px;
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
