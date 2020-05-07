import React from 'react';

import { Dropdown, Nav, Sidenav } from 'rsuite';
import { ContainerStyled } from './style';
import { Link, useLocation } from 'react-router-dom';

const LinkWrapper = React.forwardRef(({ children, ...rest }, ref) => (
  <Dropdown.Item componentClass={Link} {...rest}>
    {children}
  </Dropdown.Item>
));

const items = [
  { to: '/appointments/new', name: 'New Appointment' },
  { to: '/appointments/today', name: 'Today Appointments' },
  { to: '/calendar', name: 'Calendar' },
  { to: '/appointments', name: 'Appointments' },
  { to: '/patients', name: 'Patients' },
  { to: '/reports', name: 'Reports' },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <ContainerStyled defaultOpenKeys={['1']}>
      <Sidenav.Body>
        <Nav>
          <Dropdown eventKey="1" title="Main">
            <Dropdown.Item divider />
            {items.map(({ to, name }, idx) => (
              <LinkWrapper
                key={idx}
                to={to}
                eventKey="1-4"
                active={pathname === to}
              >
                {name}
              </LinkWrapper>
            ))}
          </Dropdown>
        </Nav>
      </Sidenav.Body>
    </ContainerStyled>
  );
}
