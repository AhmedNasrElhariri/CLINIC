import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import css from '@styled-system/css';
import { byTheme } from 'services/theme';

const theme = {
  fontSize: {
    normal: '12px',
    large: '24px',
  },
  height: {
    normal: '40px',
    large: 60,
  },
};

const LinkStyled = styled(Link)`
  display: block;
  font-family: 'SegoeUI';
  font-stretch: normal;
  font-weight: 600;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  display: flex;
  align-items: center;
  color: #1b253a;
  border-radius: 2px;
  ${byTheme(theme)}
  &:focus,
  &:active,
  &:hover {
    text-decoration: none;
    color: #1b253a;
    background: #eef1f1;
    opacity: 1;
  }
  position: relative;
  ${css({
    marginLeft: ['7px', '7px', '7px', '7px', '7px'],
    marginRight: ['6px', '6px', '6px', '6px', '6px'],
  })}
`;

export default ({ to, active, children, ...props }) => (
  <LinkStyled to={to} active={active ? 1 : 0} {...props}>
    <span>{children}</span>
  </LinkStyled>
);
