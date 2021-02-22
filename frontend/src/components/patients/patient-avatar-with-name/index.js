import React from 'react';
import { H2, Div } from 'components';
import {
  PatientInfoStyled,
  PatientAvatarStyled,
  AvatarImg,
  SmallText,
  SubText,
  SpanTitle,
  PatientDetails,
} from './style';

const AvatarBox = ({ patient }) => (
  <PatientAvatarStyled>
    <AvatarImg src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"></AvatarImg>
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
