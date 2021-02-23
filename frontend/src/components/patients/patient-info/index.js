import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CRCard, H3 } from 'components';
import {
  PatientInfoStyled,
  Cell,
  CellTitle,
  AddressStyled,
  StrongStyled,
} from './style';

import { Button } from 'rsuite';

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
    </PatientInfoStyled>
  );
}

PatientInfo.propTypes = {
  patient: PropTypes.object.isRequired,
};
