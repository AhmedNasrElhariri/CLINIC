import React from 'react';
import PropTypes from 'prop-types';
import { CRCard, H3 } from 'components';
import EditPatient from '../edit-patient';
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
      <CRCard padding='55px 10px' borderless>
        <Cell display="flex" alignItems="center" height={64}>
          <H3 mb={4}>Information</H3>
          <EditPatient patient={patient}/>
          <EditButton margin="480px">Expand</EditButton>
        </Cell>
        <Cell display="flex" alignItems="center">
          <CellTitle mb={4}>Name</CellTitle>
          <StrongStyled>
            {patient.name}
          </StrongStyled>
        </Cell>
        <Cell display="flex" alignItems="center">
          <CellTitle mb={4}>Age</CellTitle>
          <AddressStyled>{patient.age}</AddressStyled>
        </Cell>
        <Cell display="flex" alignItems="center">
          <CellTitle mb={4}>Phone Number</CellTitle>
          <AddressStyled>{patient.phoneNo}</AddressStyled>
        </Cell>
      </CRCard>
    </PatientInfoStyled>
  );
};

PatientInfo.propTypes = {
  patient: PropTypes.object.isRequired,
};

export default PatientInfo;
