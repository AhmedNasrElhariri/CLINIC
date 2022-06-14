import React from 'react';
import { Form } from 'rsuite';

import { CRButton } from 'components';
import {
  MedicineContainerStyled,
  ButtonDiv,
  LabName,
  Container,
} from './style';

const LabRow = ({ lab, onClick }) => {
  return (
    <MedicineContainerStyled>
      <Form fluid>
        <Container>
          <LabName>{lab.name}</LabName>
          <ButtonDiv>
            <CRButton
              variant={lab.required ? 'dark' : 'primary'}
              width={150}
              m="auto"
              onClick={onClick}
            >
              {lab.required ? 'Delete' : 'Require'}
            </CRButton>
          </ButtonDiv>
        </Container>
      </Form>
    </MedicineContainerStyled>
  );
};

export default LabRow;
