import React from 'react';
import { CRCard,H2, H3, H5, P, Div,Img } from 'components';
import { PatientInfoStyled,PatientAvatarStyled,AvatarImg,SmallText,SubText,SpanTitle } from './style';
import { Button } from 'rsuite';



const AvatarBox = ({ patient }) => (
    <PatientAvatarStyled>
      <AvatarImg src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"></AvatarImg>
    </PatientAvatarStyled>
);

const Detail = ({ patient }) => (
  <Div display="flex" flexDirection="column" ml={4}>
    <Div display="flex" alignItems="center" mt={3}>
      <H2>{patient.name}</H2>
     <SpanTitle>Primary</SpanTitle>
    </Div>
    <Div display="flex" alignItems="center" mt={3}>
      <SubText>{patient.name}</SubText> - <SmallText>latest diagnosis</SmallText>
    </Div>
  </Div>
);

export default function AvatarWithName({ patient }) {
  return (
    <PatientInfoStyled>
        <AvatarBox patient={patient} />
        <Detail  patient={patient}/>
    </PatientInfoStyled>
  );
}


