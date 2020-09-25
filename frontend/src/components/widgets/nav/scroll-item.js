import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { Nav } from 'rsuite';

import { Link as ScrollLink } from 'react-scroll';

const activeStyles = css`
  background-color: #ffffff;
  cursor: auto;
  border-right: 4px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  font-weight: 800;
`;

const Item = styled(ScrollLink).attrs(() => ({
  spy: true,
  smooth: true,
  duration: 500,
  isDynamic: true,
}))`
  height: 80px;
  font-size: 20px;
  font-weight: 400;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: ${props => props.theme.colors.texts[2]};
  padding: 0px 35px;

  background-color: transparent;

  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  justify-content: flex-start;

  ${props => (props.active ? activeStyles : '')}

  &:hover {
    text-decoration: none;
    color: ${props => props.theme.colors.primary};
  }
`;

export default ({
  children,
  active,
  onSelect,
  to,
  containerId,
  eventKey,
  ...props
}) => {
  const select = useCallback(e => onSelect(eventKey, e), [eventKey, onSelect]);
  return (
    <Nav.Item
      renderItem={() => (
        <Item
          onClick={select}
          active={active ? 1 : 0}
          to={to}
          containerId={containerId}
        >
          {children}
        </Item>
      )}
    />
  );
};
