import React from 'react';
import { Form } from 'rsuite';
import {
  MedicineContainerStyled,
  ButtonDiv,
  LabName,
  Container,
} from '../appointment-labs/style';
import { CRButton } from 'components';
import { useTranslation } from 'react-i18next';

const ImageRow = ({ image, onClick }) => {
  const { t } = useTranslation();
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
              {image.required ? t('delete') : t('require')}
            </CRButton>
          </ButtonDiv>
        </Container>
      </Form>
    </MedicineContainerStyled>
  );
};

export default ImageRow;
