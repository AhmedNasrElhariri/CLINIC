import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CRCard, H3,H6,Div } from 'components';
import { PatientInfoStyled } from './style';
import { getInitials } from 'services/patient';
import {Button} from 'rsuite';


export default function PatientInfo({ patient }) {
  return (
    <PatientInfoStyled>
      <CRCard borderless>
      <Div ml={3} display="flex" justifyContent="space-between" alignItems="center">
      <H3 mb={4}>Information</H3>
      <Button color="">Edit</Button>
      </Div>
      <Div ml={3} display="flex" justifyContent="space-between" alignItems="center">
      <H6 mb={4}>Date Of Birth</H6>
        <address> {patient.sex} . {patient.age} yrs</address>
      </Div>
      <Div ml={3} display="flex" justifyContent="space-between" alignItems="center">
      <H6 mb={4}>Email</H6>
      </Div>
      <Div ml={3} display="flex" justifyContent="space-between" alignItems="center">
      <H6 mb={4}>Phone Number</H6>
      <address>{patient.phoneNo}</address>
      </Div>
      
      </CRCard>
    </PatientInfoStyled>
  );
}

PatientInfo.propTypes = {
  patient: PropTypes.object.isRequired,
};
