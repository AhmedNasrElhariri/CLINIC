import React, { useMemo, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { CRModal, Div } from 'components';
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
      {images.map((element, indx) => (
        <Container>
          <Medicine>
            <Ul>
              <Li>{element.name}</Li>
            </Ul>
          </Medicine>
          <Button onClick={() => removeItem(indx)}>Delete</Button>
        </Container>
      ))}
      {/* <FooterButton
        marginLeft="231px"
        bkColor="#40c173"
        color="#fbfbfb"
        width="136px"
      >
        Send on WhatsApp
      </FooterButton> */}
      <ReactToPrint
        trigger={() => (
          <FooterButton
            marginLeft="13px"
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
          {images.length === '0' ? (
            <Div>No Images</Div>
          ) : (
            images.map(image => (
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
