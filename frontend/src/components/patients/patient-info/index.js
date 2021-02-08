import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CRCard, H3, Div } from 'components';
import {
  PatientInfoStyled,
  Cell,
  CellTitle,
  AddressStyled,
  StrongStyled,
} from './style';
import { Allergies } from 'utils/constants';

import { Button, Checkbox } from 'rsuite';

const initValue = Allergies.map(d => ({
  checked: false,
}));

const AllergiesBox = () => {
  const [formValue, setFormValue] = useState(initValue);

  const onChange = (value, idx) => {
    formValue[idx].checked = value;
    setFormValue([...formValue]);
  };
  return (
    <Div>
      {Allergies.map((d, idx) => (
        <Div display="flex" my={5} key={idx} mt={idx === 0 ? 0 : 5}>
          <Checkbox
            checked={formValue[idx].checked}
            onChange={(_, val) => onChange(val, idx)}
          >
            {d}
          </Checkbox>
        </Div>
      ))}
    </Div>
  );
};

export default function PatientInfo({ patient }) {
  return (
    <PatientInfoStyled>
      <CRCard borderless>
        <Cell
          ml={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <H3 mb={4}>Information</H3>
          <Button color="cyan">Edit</Button>
        </Cell>
        <Cell
          ml={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <CellTitle mb={4}>Date Of Birth</CellTitle>
          <StrongStyled>
            {' '}
            {patient.sex} . {patient.age} yrs
          </StrongStyled>
        </Cell>
        <Cell
          ml={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <CellTitle mb={4}>Email</CellTitle>
          <AddressStyled>{' johun@gmail.com '}</AddressStyled>
        </Cell>
        <Cell
          ml={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <CellTitle mb={4}>Phone Number</CellTitle>
          <AddressStyled>{patient.phoneNo}</AddressStyled>
        </Cell>
      </CRCard>
      <CRCard>
        <AllergiesBox />
      </CRCard>
    </PatientInfoStyled>
  );
}

PatientInfo.propTypes = {
  patient: PropTypes.object.isRequired,
};
