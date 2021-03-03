import React from 'react';
import { H2, Div } from 'components';
import {
  PatientInfoStyled,
  PatientAvatarStyled,
  AvatarImg,
  SmallText,
  SubText,
  SpanTitle,
} from './style';

const AvatarBox = ({ patient }) => (
  <PatientAvatarStyled>
    <AvatarImg src="https://cdn.icon-icons.com/icons2/1674/PNG/512/person_110935.png"></AvatarImg>
  </PatientAvatarStyled>
);

const Detail = ({ patient }) => (
  <Div display="flex" flexDirection="column" ml={4}>
    <Div display="flex" alignItems="center" mt={3}>
      <H2>{patient.name}</H2>
      <SpanTitle>Primary</SpanTitle>
    </Div>
    <Div display="flex" alignItems="center" mt={3}>
      <SubText>{patient.name}</SubText> -{' '}
      <SmallText>latest diagnosis</SmallText>
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
