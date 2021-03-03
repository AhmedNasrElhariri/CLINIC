import React, { useCallback, useState } from 'react';
import { Form, FormGroup, FormControl } from 'rsuite';

import {
  MedicineContainerStyled,
  BoxStyled,
  LabName,
  Container,
} from './style';
import { CRButton, Div, H6, H7 } from 'components';

// 'rgb(81 198 243)'
const MedicineRow = ({ labsValue, onChange: setFormValue, lab }) => {
  const [prescribe,setPrescribe] = useState('Require');
  const handleClicked = useCallback(() => {
    const newLabs = [...labsValue, lab];
    setFormValue(newLabs);
    setPrescribe('Required')
  }, [setFormValue,setPrescribe]);

  return (
    <MedicineContainerStyled>
      <Form fluid>
        <Container>
          <LabName>{lab.testName}</LabName>
          <CRButton
            primary
            small
            m="auto"
            onClick={handleClicked}
            style={{ padding: '10px' }}
          >
            {prescribe}
          </CRButton>
        </Container>
      </Form>
    </MedicineContainerStyled>
  );
};

export default MedicineRow;
