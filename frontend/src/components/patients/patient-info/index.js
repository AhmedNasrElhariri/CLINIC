import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CRCard, H3, Div } from 'components';
import {
  PatientInfoStyled,
  Cell,
  CellTitle,
  AddressStyled,
  StrongStyled,
  EditButton,
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
          alignItems="center"
          height={64}
          
        >
          <H3 mb={4}>Information</H3>
          <EditButton margin='15px'>Edit</EditButton>
          <EditButton margin='925px'>Expand</EditButton>
        </Cell>
        <Cell
          ml={3}
          display="flex"
          alignItems="center"
        >
          <CellTitle mb={4}>Date of Birth</CellTitle>
          <StrongStyled>
            {patient.sex} . {patient.age} yrs
          </StrongStyled>
        </Cell>
        <Cell
          ml={3}
          display="flex"
          alignItems="center"
        >
          <CellTitle mb={4}>Email</CellTitle>
          <AddressStyled>{' johun@gmail.com '}</AddressStyled>
        </Cell>
        <Cell
          ml={3}
          display="flex"
          alignItems="center"
        >
          <CellTitle mb={4}>Phone Number</CellTitle>
          <AddressStyled>{'01028130554'}</AddressStyled>
        </Cell>
      </CRCard>
      {/* <CRCard>
        <AllergiesBox />
      </CRCard> */}
    </PatientInfoStyled>
  );
}

PatientInfo.propTypes = {
  patient: PropTypes.object.isRequired,
};
