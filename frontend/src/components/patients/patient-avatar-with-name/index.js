import React from 'react';
import { Div } from 'components';
import {
  PatientInfoStyled,
  PatientAvatarStyled,
  AvatarImg,
  SpanTitle,
  PatientDetails,
} from './style';

const AvatarBox = ({ patient }) => (
  <PatientAvatarStyled>
    <AvatarImg src="https://cdn.icon-icons.com/icons2/1674/PNG/512/person_110935.png"></AvatarImg>
  </PatientAvatarStyled>
);

const Detail = ({ patient }) => (
  <Div display="flex" flexDirection="column" ml={4}>
    <Div display="flex" alignItems="center" mt={3}>
      <PatientDetails>{patient.name}</PatientDetails>
      <SpanTitle>Primary</SpanTitle>
    </Div>
  </Div>
);

export default function AvatarWithName({ patient }) {
  return (
    <PatientInfoStyled>
      <AvatarBox patient={patient} />
      <Detail patient={patient} />
    </PatientInfoStyled>
  );
}
