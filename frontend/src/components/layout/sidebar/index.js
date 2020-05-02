import React from 'react';

import { Dropdown, Nav, Sidenav } from 'rsuite';
import { ContainerStyled } from './style';

export default function Sidebar() {
  return (
    <ContainerStyled defaultOpenKeys={['3', '4']}>
      <Sidenav.Body>
        <Nav>
          <Dropdown eventKey="3" title="Main">
            <Dropdown.Item divider />
            <Dropdown.Item href="/appointments/new" eventKey="3-1">
              New Appointment
            </Dropdown.Item>
            <Dropdown.Item href="/appointments/today" eventKey="3-2">
              Today Appointments
            </Dropdown.Item>
            <Dropdown.Item href="/calendar" eventKey="3-3">
              Calendar
            </Dropdown.Item>
            <Dropdown.Item href="/appointments" eventKey="3-4">
              Appointments
            </Dropdown.Item>
            <Dropdown.Item href="/patients" eventKey="3-5">
              Patients
            </Dropdown.Item>
            <Dropdown.Item href="/reports" eventKey="3-6">
              Reports
            </Dropdown.Item>
          </Dropdown>
        </Nav>
      </Sidenav.Body>
    </ContainerStyled>
  );
}
