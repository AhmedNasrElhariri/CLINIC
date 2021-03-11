import React from 'react';
import { Form } from 'rsuite';

import { CRButton } from 'components';
import {
  MedicineContainerStyled,
  ButtonDiv,
  LabName,
  Container,
} from './style';

const MedicineRow = ({ lab, onClick }) => {
  return (
    <MedicineContainerStyled>
      <Form fluid>
        <Container>
          <LabName>{lab.name}</LabName>
          <ButtonDiv>
            <CRButton
              variant={lab.required ? 'dark' : 'primary'}
              small
              width={150}
              m="auto"
              onClick={onClick}
            >
              {lab.required ? 'Required' : 'Require'}
            </CRButton>
          </ButtonDiv>
        </Container>
      </Form>
    </MedicineContainerStyled>
  );
};

export default MedicineRow;
