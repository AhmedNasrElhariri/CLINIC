import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CRCard, H3, H5, P, Div, Img } from 'components';

const PatientIntials = styled.div`
  border-radius: ${props => props.theme.radius}px;
  background-color: ${props => props.theme.colors.primaryLighter};
  width: 76px;
  height: 76px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Summary = ({ patient }) => (
  <>
    <Div display="flex">
      <PatientIntials>
        <H5>JD</H5>
      </PatientIntials>
      <Div ml={3} display="flex" alignItems="center">
        <Div>
          <H5 fontWeight={600}>{patient.name}</H5>
          <P variant="primary" fontWeight={600}>
            {patient.type}
          </P>
        </Div>
      </Div>
    </Div>
    <P mt={3}>
      {patient.sex} . {patient.age} yrs
    </P>
  </>
);

const Detail = ({ img, children }) => (
  <Div display="flex" alignItems="center" mt={3}>
    <Img src={img} alt="" width={25} height={25} />
    <P ml={25}>{children}</P>
  </Div>
);

export default function PatientInfo({ patient }) {
  return (
    <CRCard borderless>
      <H3 mb={4}>Patient Info</H3>
      <Summary patient={patient} />
      <Detail img="/icons/phone.svg">{patient.phoneNo}</Detail>
    </CRCard>
  );
}

PatientInfo.propTypes = {
  patient: PropTypes.object.isRequired,
};
