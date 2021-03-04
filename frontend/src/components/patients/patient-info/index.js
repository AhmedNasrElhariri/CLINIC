import React from 'react';
import PropTypes from 'prop-types';
import { CRCard, H3 } from 'components';
import {
  PatientInfoStyled,
  Cell,
  CellTitle,
  AddressStyled,
  StrongStyled,
  EditButton,
} from './style';

const PatientInfo = ({ patient }) => {
  return (
    <PatientInfoStyled>
      <CRCard borderless>
        <Cell ml={3} display="flex" alignItems="center" height={64}>
          <H3 mb={4}>Information</H3>
          <EditButton margin="15px">Edit</EditButton>
          <EditButton margin="925px">Expand</EditButton>
        </Cell>
        <Cell ml={3} display="flex" alignItems="center">
          <CellTitle mb={4}>Date of Birth</CellTitle>
          <StrongStyled>
            {patient.sex} . {patient.age} yrs
          </StrongStyled>
        </Cell>
        <Cell ml={3} display="flex" alignItems="center">
          <CellTitle mb={4}>Email</CellTitle>
          <AddressStyled>{' johun@gmail.com '}</AddressStyled>
        </Cell>
        <Cell ml={3} display="flex" alignItems="center">
          <CellTitle mb={4}>Phone Number</CellTitle>
          <AddressStyled>{'01028130554'}</AddressStyled>
        </Cell>
      </CRCard>
    </PatientInfoStyled>
  );
};

PatientInfo.propTypes = {
  patient: PropTypes.object.isRequired,
};

export default PatientInfo;
