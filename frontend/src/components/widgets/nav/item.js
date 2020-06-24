import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { Nav } from 'rsuite';

import { Div } from 'components/widgets';

const activeStyles = css`
  background-color: #ffffff;
  cursor: auto;
  border-bottom: 4px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  font-weight: 800;
`;

const Item = styled(Div)`
  width: 193px;
  height: 93px;
  font-size: 24px;
  font-weight: 400;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: ${props => props.theme.colors.texts[2]};

  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 17px 17px 0px 0px;
  border: none;
  cursor: pointer;

  ${props => (props.active ? activeStyles : '')}
`;

export default ({ children, active, onSelect, eventKey, ...props }) => {
  const select = useCallback(e => onSelect(eventKey, e), [eventKey, onSelect]);

  return (
    <Nav.Item
      {...props}
      renderItem={() => (
        <Item onClick={select} active={active}>
          {children}
        </Item>
      )}
    />
  );
};
