import React from 'react';

import { ContainerStyled, BodyStyled, IconDiv, LinkName, Fab } from './style';
import { useLocation } from 'react-router-dom';
import { Can } from 'components/user/can';
import Link from './link';
export default function Sidebar({ onLogout, items }) {
  const { pathname } = useLocation();
  return (
    <ContainerStyled>
      <BodyStyled>
        {items.map(({ to, name, extra, icon }, idx) =>
          name === 'Permissions' ? (
            <Can I="View" an="Permission">
              <Link
                key={idx}
                to={to}
                active={pathname === to}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <IconDiv>{icon}</IconDiv>
                <LinkName>{name}</LinkName>
                <Fab>{extra}</Fab>
              </Link>
            </Can>
          ) : (
            <Link
              key={idx}
              to={to}
              active={pathname === to}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <IconDiv>{icon}</IconDiv>
              <LinkName>{name}</LinkName>
              <Fab>{extra}</Fab>
            </Link>
          )
        )}
      </BodyStyled>
    </ContainerStyled>
  );
}
