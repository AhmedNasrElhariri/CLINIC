import React, { useMemo, useRef, useState } from 'react';
import { Divider, Toggle } from 'rsuite';
import ReactToPrint from 'react-to-print';
import { formatDate, formatFullDay } from 'utils/date';
import { useMedicineDefinitions, useTimings } from 'hooks';
import * as R from 'ramda';
import { CRModal, Div, H6 } from 'components';
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
  ContainerStyled,
  StyledFooterData,
} from './style';
let newPrescription = [];
function Prescription({
  visible,
  onClose,
  medicine,
  onChange: setFormValue2,
  nextAppointment,
  arabicEnable,
}) {
  const [enable, setEnable] = useState(false);
  const { medicineDefinitions } = useMedicineDefinitions();
  const { timings } = useTimings();
  const header = useMemo(() => 'Prescription', []);
  const removeItem = indx => {
    newPrescription = medicine.filter((element, index) => {
      return index !== indx;
    });
    setFormValue2(newPrescription);
  };
  const newMedicine = medicine.map((m, idx) => {
    const formMedicine =
      medicineDefinitions.find(f => f.id === m.medicineId) || {};
    const { dose, medicineId, timingId, duration, period } = m;
    let specificTiming = timings.find(t => t.id === timingId);
    const tN = R.propOr('', 'name')(specificTiming);
    return {
      medicine: formMedicine,
      dose: dose || undefined,
      timing: tN || undefined,
      medicineId: medicineId || m.id || null,
      duration: duration || '',
      period: period || null,
      required: !R.isEmpty(formMedicine),
    };
  });
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
      {newMedicine.map((element, indx) => (
        <Container color='#f4f4f6'>
          <Medicine>
            <Ul>
              <Li>{element.medicine.name}</Li>
              <Div display="flex">
                <Div>
                  {element.dose}
                  {' - '}
                </Div>
                <Div>
                  {' '}
                  {element.timing}
                  {' - '}
                </Div>
                <Div>
                  {' for '}
                  {' - '}
                </Div>
                <Div>{element.duration} </Div>
                <Div>{element.period}</Div>
              </Div>
            </Ul>
          </Medicine>
          <Button onClick={() => removeItem(indx)}>Delete</Button>
        </Container>
      ))}
      <Divider />
      <Div display="flex" justifyContent="space-between">
        <Div>Next Appointment </Div>
        <Div>{formatFullDay(nextAppointment.date)}</Div>
        <Toggle onChange={setEnable} />
      </Div>
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
          {newMedicine.length === '0' ? (
            <Div>No Medicines</Div>
          ) : (
            newMedicine.map((element, indx) => (
              <Container>
                <Medicine>
                  <Ul>
                    <Li>{element.medicine.name}</Li>
                    <Div display="flex">
                      <Div>
                        {element.dose}
                        {' - '}
                      </Div>
                      <Div>
                        {' '}
                        {element.timing}
                        {' - '}
                      </Div>
                      <Div>
                        {' for '}
                        {' - '}
                      </Div>
                      <Div>{element.duration} </Div>
                      <Div>{element.period}</Div>
                    </Div>
                  </Ul>
                </Medicine>
              </Container>
            ))
          )}
          {enable ? (
            <StyledFooterData>
              <H6 style={{ marginRight: '50px' }}>
                {formatFullDay(nextAppointment.date)}
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
