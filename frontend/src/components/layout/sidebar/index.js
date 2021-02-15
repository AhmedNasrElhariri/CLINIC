import React, { useState } from 'react';

import { ContainerStyled, BodyStyled, IconDiv, LinkName, Fab } from './style';
import { useLocation, Link as RouterLink } from 'react-router-dom';

import Link from './link';
import { Div, Img } from 'components';
import { marginRight } from 'styled-system';

export default function Sidebar({ onLogout, items }) {
  const { pathname } = useLocation();
  return (
    <ContainerStyled>
      {/* <Div position="absolute" left={35} top={40}>
        <RouterLink to="/">
          <Img src="/logo.svg" alt="" width={150} />
        </RouterLink>
      </Div> */}
      <BodyStyled>
        {items.map(({ to, name, extra, icon }, idx) => (
          <Link
            key={idx}
            to={to}
            active={pathname === to}
            style={{ position: 'relative' }}
          >
            <IconDiv>{icon}</IconDiv>
            <LinkName>{name}</LinkName>
            <Fab>{extra}</Fab>
          </Link>
        ))}
      </BodyStyled>
    </ContainerStyled>
  );
}
