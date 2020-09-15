import React from 'react';

import { ContainerStyled, BodyStyled } from './style';
import { useLocation } from 'react-router-dom';

import Link from './link';
import { Div, Img } from 'components';

const items = [
  { to: '/appointments/today', name: `Today's Appointments` },
  { to: '/calendar', name: 'Calendar' },
  { to: '/appointments', name: 'Appointments' },
  { to: '/patients', name: 'Patients' },
  { to: '/reports', name: 'Reports' },
  // { to: '/views', name: 'Views' },
];

export default function Sidebar({ onLogout }) {
  const { pathname } = useLocation();

  return (
    <ContainerStyled>
      <Div position="absolute" left={35} top={-10}>
        <Img src="/logo.svg" alt="" width={150} />
      </Div>
      <BodyStyled>
        {items.map(({ to, name }, idx) => (
          <Link key={idx} to={to} active={pathname === to}>
            {name}
          </Link>
        ))}
      </BodyStyled>
    </ContainerStyled>
  );
}
