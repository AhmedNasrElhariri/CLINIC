import React, { useMemo, useRef, useState } from 'react';
import { Schema, Divider, Toggle } from 'rsuite';
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
  DoesContent,
  Row,
  ContainerStyled,
  Content,
  NextAppointment,
  StyledFooterData,
} from './style';
import { height, marginLeft } from 'styled-system';
const model = Schema.Model({});
let newPrescription = [];
function Prescription({
  visible,
  onClose,
  medicine,
  onChange: setFormValue2,
  nextAppointment,
}) {
  const [enable, setEnable] = useState(false);
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
      CRContainer={ContainerStyled}
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
      <Divider />
      <NextAppointment>
        <H6 style={{ marginRight: '29px' }}>Next Appointment </H6>
        <H6 style={{ marginRight: '31px' }}>
          {formatDate(nextAppointment.date)}
        </H6>
        <H6 style={{ marginRight: '75px' }}>
          {formatDate(nextAppointment.date)}
        </H6>
        <Toggle onChange={setEnable} />
      </NextAppointment>
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
      <Div style={{ overflow: 'hidden', height: '0px' }}>
        <PrescriptionPrintout ref={ref}>
          {medicine.length == '0' ? (
            <Div>No Medicines</Div>
          ) : (
            medicine.map(medicine => (
              <Div style={{ marginBottom: '15px' }}>
                <MedicineName>{medicine.medicine}</MedicineName>
                <Row>
                  <DoesContent>
                    {medicine.dose}
                    {'  '}
                  </DoesContent>
                  <Content>
                    {medicine.timing}
                    {'  '}
                  </Content>
                  <Content>
                    {medicine.numDuration} {'  '} {medicine.periodDuration}
                  </Content>
                </Row>
              </Div>
            ))
          )}
          {enable ? (
            <StyledFooterData>
              <H6 style={{ marginRight: '50px' }}>
                {formatDate(nextAppointment.date)}
              </H6>
              <H6>{'المعاد القادم'}</H6>
            </StyledFooterData>
          ) : (
            <></>
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
