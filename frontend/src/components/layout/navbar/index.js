import React from 'react';

import { Dropdown, Nav, Sidenav, Icon } from 'rsuite';
// import { ContainerStyled } from './style';
import { Link, useLocation } from 'react-router-dom';
import { Div } from 'components';

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

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <Div display="flex" width="100%" justifyContent="flex-end">
      <Nav style={{ margin: 20 }}>
        <Nav.Item icon={<Icon icon="home" />}>Home</Nav.Item>
        <Nav.Item>About</Nav.Item>
      </Nav>
    </Div>
  );
}
