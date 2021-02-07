import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { byTheme } from 'services/theme';

const theme = {
  fontSize: {
    normal: '18px',
    large: '24px',
  },
  height: {
    normal: 67,
    large: 80,
  },
};

const LinkStyled = styled(Link)`
  display: block;
  font-family: 'SegoeUI';
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  display: flex;
  align-items: center;

  opacity: ${props => (props.active ? 1 : 0.4)};
  color: ${props =>
    props.active ? props.theme.colors.primary : props.theme.colors.text};
  font-weight: ${props => (props.active ? 'bold' : 'normal')};

  border-radius: 18px;

  ${byTheme(theme)}

  &:focus,
  &:active,
  &:hover {
    text-decoration: none;
    color: ${props => props.theme.colors.primary};
    opacity: 1;
  }
  position: relative;
  padding-right: 10px;
`;

const VBorder = styled.span`
  position: absolute;
  ${byTheme({
    width: {
      normal: 10,
      large: 12,
    },
  })}
  right: 0;
  top: 0;
  height: 100%;
  background-color: ${props => props.theme.colors.primary};
  display: ${props => (props.active ? 'block' : 'none')};
  border-radius: 50px 0px 0px 50px;
`;

export default ({ to, active, children, ...props }) => (
  <LinkStyled to={to} active={active ? 1 : 0} {...props}>
    <span>{children}</span>
    <VBorder active={active} />
  </LinkStyled>
);
