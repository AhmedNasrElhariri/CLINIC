import React, { useMemo, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { CRModal, Div } from 'components';
import { useImageDefinition } from 'hooks';
import {
  Title,
  Container,
  Medicine,
  Button,
  Ul,
  Li,
  FooterButton,
  MedicineName,
  ContainerStyled,
  PrescriptionPrintout,
} from '../labs/style';
let newImages = [];
function Images({ visible, onClose, images, onChange: setFormValue2 }) {
  const header = useMemo(() => 'Images', []);
  const { imagesDefinition } = useImageDefinition();
  const Images = imagesDefinition.filter(i => images.includes(i.id));
  const removeItem = indx => {
    newImages = images.filter((element, index) => {
      return index !== indx;
    });
    setFormValue2(newImages);
  };
  const ref = useRef();
  return (
    <CRModal
      show={visible}
      header={header}
      CRContainer={ContainerStyled}
      onHide={onClose}
      CancelFooter={true}
      bodyStyle={{ padding: '0px' }}
      headerStyle={{ borderBottom: 'none', padding: '27px' }}
    >
      <Title>Images</Title>
      {Images.map((element, indx) => (
        <Container>
          <Medicine>
            <Ul>
              <Li>{element.name}</Li>
            </Ul>
          </Medicine>
          <Button onClick={() => removeItem(indx)}>Delete</Button>
        </Container>
      ))}
      <ReactToPrint
        trigger={() => (
          <FooterButton
            marginLeft="25px"
            bkColor="#50c7f2"
            color="#fbfbfb"
            width="81px"
          >
            Print
          </FooterButton>
        )}
        content={() => ref.current}
      />
      <Div style={{ height: '0px', overflow: 'hidden' }}>
        <PrescriptionPrintout ref={ref}>
          {Images.length === '0' ? (
            <Div>No Pictures</Div>
          ) : (
            Images.map(image => (
              <Div>
                <MedicineName>{image.name}</MedicineName>
              </Div>
            ))
          )}
        </PrescriptionPrintout>
      </Div>
    </CRModal>
  );
}

Images.defaultProps = {
  type: 'create',
};

export default Images;
