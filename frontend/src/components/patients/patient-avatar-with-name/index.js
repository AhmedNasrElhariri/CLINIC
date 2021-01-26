import React from 'react';
import styled from 'styled-components';
import { CRCard,H2, H3, H5, P, Div,Img } from 'components';
import { PatientInfoStyled } from './style';
import { Avatar,Button } from 'rsuite';



const AvatarBox = ({ patient }) => (
    <Div display="flex">
        <Avatar size="lg" src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4" />
    </Div>
);

const Detail = ({ patient }) => (
  <Div display="flex" flexDirection="column" ml={3}>
    <Div display="flex" alignItems="center" mt={3}>
      <H2>{patient.name}</H2>
      <Button color="cyan">Primary</Button>
    </Div>
    <Div display="flex" alignItems="center" mt={3}>
      <P>{patient.name}</P> - <small color="gray">Primary</small>
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


