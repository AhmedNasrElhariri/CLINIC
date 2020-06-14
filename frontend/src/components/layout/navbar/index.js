import React from 'react';

import { Dropdown, Nav, Sidenav, Icon } from 'rsuite';
import { NavStyled } from './style';

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
  // const { pathname } = useLocation();

  return (
    <NavStyled>
    </NavStyled>
  );
}
