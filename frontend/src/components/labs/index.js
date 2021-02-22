import React from 'react';
import {
  StyledLab,
  StyledSelect,
  StyeldCell,
  Container,
  Lab,
  Button,
} from './styles';
import { CRButton } from 'components';

function Labs() {
  const labs = [
    { id: 1, name: 'lab1' },
    { id: 2, name: 'lab2' },
    { id: 3, name: 'lab3' },
    { id: 3, name: 'lab3' },
  ];
  return (
    <>
      <StyledLab>New Tab</StyledLab>
      <CRButton width={91} height={30} style={{ margin: '20.5px 10px 47px' }}>
        Add News +{' '}
      </CRButton>
      <CRButton width={91} height={30}>
        Next Times Slots +{' '}
      </CRButton>
      <StyledSelect>Select Lab</StyledSelect>
      <hr></hr>
      {labs.map(element => (
        <Container>
          <Lab>{element.name}</Lab>
          <Button>Button</Button>
        </Container>
      ))}
    </>
  );
}

export default Labs;
