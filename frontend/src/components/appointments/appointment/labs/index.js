import React, { useMemo, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { useLabDefinitions } from 'hooks';
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
} from './style';
let newLabs = [];
function Labs({ visible, onClose, labs, onChange: setFormValue2 }) {
  const header = useMemo(() => 'Labs', []);
  const { labsDefinition } = useLabDefinitions();
  const Labs = labsDefinition.filter(l => labs.includes(l.id));
  const removeItem = indx => {
    newLabs = labs.filter((element, index) => {
      return index !== indx;
    });
    setFormValue2(newLabs);
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
      <Title>Labs</Title>
      {Labs.map((element, indx) => (
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
            marginLeft="26px"
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
          {Labs.length === '0' ? (
            <Div>No Labs</Div>
          ) : (
            Labs.map(lab => (
              <Div>
                <MedicineName>{lab.name}</MedicineName>
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
