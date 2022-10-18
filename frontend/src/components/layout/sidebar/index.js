import React from 'react';

import { ContainerStyled, BodyStyled, IconDiv, LinkName, Fab } from './style';
import { useLocation } from 'react-router-dom';
import { Can } from 'components/user/can';
import Link from './link';
import { Fragment } from 'react';
export default function Sidebar({ onLogout, items }) {
  const { pathname } = useLocation();
  return (
    <ContainerStyled>
      <BodyStyled>
        {items.map(({ to, name, extra, icon }, idx) => (
          <Fragment key={name}>
            {name === 'Permissions' ? (
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
            ) : name === 'Supplier Account' ? (
              <Can I="View" an="SupplierAccount">
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
            ) : name === 'Courses' ? (
              <Can I="ViewCourses" an="Patient">
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
            )}
          </Fragment>
        ))}
      </BodyStyled>
    </ContainerStyled>
  );
}
