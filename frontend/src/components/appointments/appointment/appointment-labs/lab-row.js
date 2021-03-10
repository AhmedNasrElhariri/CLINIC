import React, { useCallback, useState } from 'react';
import { Form, FormGroup, FormControl } from 'rsuite';

import {
  MedicineContainerStyled,
  ButtonDiv,
  LabName,
  Container,
} from './style';
import { CRButton, Div, H6, H7 } from 'components';

// 'rgb(81 198 243)'
const MedicineRow = ({ labsValue, onChange: setFormValue, lab }) => {
  const [prescribe, setPrescribe] = useState('Require');
  const [color, setColor] = useState('primary');
  const handleClicked = useCallback(() => {
    const newLabs = [...labsValue, lab];
    setFormValue(newLabs);
    setPrescribe('Required');
    setColor('success');
  }, [setFormValue, setPrescribe]);

  return (
    <MedicineContainerStyled>
      <Form fluid>
        <Container>
          <LabName>{lab.name}</LabName>
          <ButtonDiv>
            <CRButton
              variant={color}
              small
              m="auto"
              onClick={handleClicked}
              style={{ padding: '10px' }}
            >
              {prescribe}
            </CRButton>
          </ButtonDiv>
        </Container>
      </Form>
    </MedicineContainerStyled>
  );
};

export default MedicineRow;
