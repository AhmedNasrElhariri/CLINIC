import React, { useMemo, useRef } from 'react';
import { Schema } from 'rsuite';
import ReactToPrint from 'react-to-print';
import { formatDate } from 'utils/date';
import { CRModal, Div, H4, H6 } from 'components';
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
  SubTitle,
  Row,
  Content,
} from './style';
const model = Schema.Model({});
let newPrescription = [];
function Prescription({
  visible,
  onClose,
  medicine,
  onChange: setFormValue2,
  nextAppointment,
}) {
  const header = useMemo(() => 'Prescription');
  const removeItem = indx => {
    newPrescription = medicine.filter((element, index) => {
      return index != indx;
    });
    setFormValue2(newPrescription);
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
      <Title>Medicine</Title>
      {medicine.map((element, indx) => (
        <Container>
          <Medicine>
            <Ul>
              <Li>{element.medicine}</Li>
              <li>
                {element.timing} - {element.numDuration} -{' '}
                {element.periodDuration}
              </li>
            </Ul>
          </Medicine>
          <Button onClick={() => removeItem(indx)}>Delete</Button>
        </Container>
      ))}
      <Div display="flex" justifyContent="space-between" mb={3}>
        <H6>Next Appointment </H6>
        <H6>{nextAppointment.type}</H6>
        <H6>{formatDate(nextAppointment.date)}</H6>
      </Div>
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
        <PrescriptionPrintout
          ref={ref}
          
        >
          {medicine.length == '0' ? (
            <Div>No Medicines</Div>
          ) : (
            medicine.map(medicine => (
              <Div>
                <MedicineName>Medicine: {medicine.medicine}</MedicineName>
                <Row>
                  <SubTitle>Dose: </SubTitle>
                  <Content>{medicine.dose}</Content>
                </Row>
                <Row>
                  <SubTitle>Timing: </SubTitle>
                  <Content>{medicine.timing}</Content>
                </Row>
                <Row>
                  <SubTitle>Duration: </SubTitle>
                  <Content>
                    {medicine.numDuration} {'  '} {medicine.periodDuration}
                  </Content>
                </Row>
              </Div>
            ))
          )}
        </PrescriptionPrintout>
      </Div>
    </CRModal>
  );
}

Prescription.defaultProps = {
  type: 'create',
};

export default Prescription;
