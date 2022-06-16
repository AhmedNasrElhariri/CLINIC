import React from 'react';
import { Form } from 'rsuite';

import { CRButton } from 'components';
import {
  MedicineContainerStyled,
  ButtonDiv,
  LabName,
  Container,
} from './style';
import { useTranslation } from 'react-i18next';

const LabRow = ({ lab, onClick }) => {
  const { t } = useTranslation();
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
              {lab.required ? t('delete') : t('require')}
            </CRButton>
          </ButtonDiv>
        </Container>
      </Form>
    </MedicineContainerStyled>
  );
};

export default LabRow;
