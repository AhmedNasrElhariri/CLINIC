import React from 'react';
import { Form } from 'rsuite';
import {
  MedicineContainerStyled,
  ButtonDiv,
  LabName,
  Container,
} from '../appointment-labs/style';
import { CRButton } from 'components';

const ImageRow = ({ image, onClick }) => {
  return (
    <MedicineContainerStyled>
      <Form fluid>
        <Container>
          <LabName>{image.name}</LabName>
          <ButtonDiv>
            <CRButton
              variant={image.required ? 'dark' : 'primary'}
              m="auto"
              onClick={onClick}
              style={{ padding: '10px' }}
            >
              {image.required ? 'Required' : 'Require'}
            </CRButton>
          </ButtonDiv>
        </Container>
      </Form>
    </MedicineContainerStyled>
  );
};

export default ImageRow;
