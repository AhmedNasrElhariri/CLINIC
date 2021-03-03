import React, { useMemo, useRef } from 'react';
import { Schema } from 'rsuite';
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
  PrescriptionPrintout,
} from './style';
const model = Schema.Model({});
let newLabs = [];
function Labs({ visible, onClose, labs, onChange: setFormValue2 }) {
  const header = useMemo(() => 'Labs');
  const removeItem = indx => {
    newLabs = labs.filter((element, index) => {
      return index != indx;
    });
    setFormValue2(newLabs);
  };
  const ref = useRef();
  return (
    <CRModal
      show={visible}
      header={header}
      width={489}
      height={404}
      onHide={onClose}
      CancelFooter={true}
      bodyStyle={{ padding: '0px' }}
      headerStyle={{ borderBottom: 'none', padding: '27px' }}
    >
      <Title>Labs</Title>
      {labs.map((element, indx) => (
        <Container>
          <Medicine>
            <Ul>
              <Li>{element.testName}</Li>
            </Ul>
          </Medicine>
          <Button onClick={() => removeItem(indx)}>Delete</Button>
        </Container>
      ))}
      <FooterButton
        marginLeft="231px"
        bkColor="#40c173"
        color="#fbfbfb"
        width="136px"
      >
        Send on WhatsApp
      </FooterButton>
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
          {labs.length == '0' ? (
            <Div>No Labs</Div>
          ) : (
            labs.map(lab => (
              <Div>
                <MedicineName>Lab: {lab.testName}</MedicineName>
              </Div>
            ))
          )}
        </PrescriptionPrintout>
      </Div>
    </CRModal>
  );
}

Labs.defaultProps = {
  type: 'create',
};

export default Labs;
