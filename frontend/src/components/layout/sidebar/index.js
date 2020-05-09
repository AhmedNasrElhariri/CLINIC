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
  { to: '/views', name: 'Views' },
];
const panelStyles = {
  padding: '15px 20px',
  color: '#aaa',
};

export default function Sidebar({ onLogout }) {
  const { pathname } = useLocation();

  return (
    <ContainerStyled defaultOpenKeys={['1', '2']}>
      <Sidenav.Body>
        <Nav>
          <Dropdown eventKey="1" title="Advanced">
            <Dropdown.Item divider />
            <Dropdown.Item panel style={panelStyles}>
              Main
            </Dropdown.Item>
            {items.map(({ to, name }, idx) => (
              <LinkWrapper key={idx} to={to} active={pathname === to}>
                {name}
              </LinkWrapper>
            ))}
            <Dropdown.Item divider />
            <Dropdown.Item panel style={panelStyles}>
              User
            </Dropdown.Item>
            <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
          </Dropdown>
        </Nav>
      </Sidenav.Body>
    </ContainerStyled>
  );
}
