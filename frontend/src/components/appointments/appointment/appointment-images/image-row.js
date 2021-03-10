import React, { useCallback, useState } from 'react';
import { Form } from 'rsuite';
import {
  MedicineContainerStyled,
  ButtonDiv,
  LabName,
  Container,
} from '../appointment-labs/style';
import { CRButton, Div, H6, H7 } from 'components';

const ImageRow = ({ imagesValue, onChange: setFormValue, image }) => {
  const [prescribe, setPrescribe] = useState('Require');
  const [color, setColor] = useState('primary');
  const handleClicked = useCallback(() => {
    const newImages = [...imagesValue, image];
    setFormValue(newImages);
    setPrescribe('Required');
    setColor('success');
  }, [setFormValue, setPrescribe]);

  return (
    <MedicineContainerStyled>
      <Form fluid>
        <Container>
          <LabName>{image.name}</LabName>
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

export default ImageRow;
