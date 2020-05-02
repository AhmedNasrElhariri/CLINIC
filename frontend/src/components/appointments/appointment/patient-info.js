import React from 'react';
import PropTypes from 'prop-types';
import { Sidenav, Nav, Dropdown, Divider } from 'rsuite';

import { KeyStyled, ValueStyled } from 'components/misc';

const generalInfo = [
  {
    name: 'Name',
    prop: 'name',
  },
  {
    name: 'Sex',
    prop: 'sex',
  },
  {
    name: 'Age',
    prop: 'age',
  },
];

export default function PatientInfo({ patient }) {
  return (
    <Sidenav defaultOpenKeys={['3', '4']}>
      <Sidenav.Body>
        <Nav>
          <Dropdown eventKey="3" title="Patient Info">
            <Dropdown.Item divider />
            {generalInfo.map(({ name, prop }, idx) => (
              <Dropdown.Item key={idx}>
                <KeyStyled>{name}</KeyStyled>
                <Divider vertical />
                <ValueStyled>{patient[prop]}</ValueStyled>
              </Dropdown.Item>
            ))}
          </Dropdown>
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  );
}

PatientInfo.propTypes = {
  patient: PropTypes.object.isRequired,
};
