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
      <CRCard  borderless>
        <Cell  height={64}>
          <H3>Information</H3>
          <EditPatient patient={patient}/>
          <EditButton>Expand</EditButton>
        </Cell>
        <Cell >
          <CellTitle>Name</CellTitle>
          <StrongStyled>
            {patient.name}
          </StrongStyled>
        </Cell>
        <Cell >
          <CellTitle>Age</CellTitle>
          <AddressStyled>{patient.age}</AddressStyled>
        </Cell>
        <Cell >
          <CellTitle>Phone Number</CellTitle>
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
