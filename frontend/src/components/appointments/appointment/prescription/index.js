import React, { useMemo, useRef, useState } from 'react';
import { Divider, Toggle } from 'rsuite';
import ReactToPrint from 'react-to-print';
import { formatFullDay } from 'utils/date';
import { useMedicineDefinitions, useTimings, useConfigurations } from 'hooks';
import * as R from 'ramda';
import { CRModal, Div, H6 } from 'components';
import {
  Title,
  Container,
  Medicine,
  PrintContainer,
  PrintMedicine,
  Button,
  Ul,
  Li,
  FooterButton,
  PrescriptionPrintout,
  ContainerStyled,
  StyledFooterData,
} from './style';
import PrescriptionPrinting from './prescription';
import { useTranslation } from 'react-i18next';

const peridos = [
  { id: 'year', arbiceValue: 'سنة' },
  { id: 'month', arbiceValue: 'شهر' },
  { id: 'week', arbiceValue: 'أسبوع' },
  { id: 'day', arbiceValue: 'يوم' },
];
let newPrescription = [];
function Prescription({
  visible,
  onClose,
  medicine,
  onChange: setFormValue2,
  nextAppointment,
}) {
  const [enable, setEnable] = useState(false);
  const { t } = useTranslation();
  const ref = useRef();
  const refTwo = useRef();
  const { medicineDefinitions } = useMedicineDefinitions();
  const { pageSetupData } = useConfigurations();
  const pageSetupRow = pageSetupData.find(
    element => element.type === 'prescription'
  );
  const [direction, setDirection] = useState('rtl');
  const { timings } = useTimings();
  const header = useMemo(() => t('prescription'), []);
  const removeItem = indx => {
    newPrescription = medicine.filter((element, index) => {
      return index !== indx;
    });
    setFormValue2(newPrescription);
  };
  const newMedicine = medicine?.map((m, idx) => {
    const formMedicine =
      medicineDefinitions.find(f => f.id === m.medicineId) || {};
    const { dose, medicineId, timingId, duration, period } = m;
    let specificTiming = timings.find(t => t.id === timingId);
    let specificPeriod = peridos.find(p => p.id === period);
    const tN = R.propOr('', 'name')(specificTiming);
    const tA = R.propOr('', 'arabicPrintValue')(specificTiming);
    const tE = R.propOr('', 'englishPrintValue')(specificTiming);
    const periodAr = R.propOr('', 'arbiceValue')(specificPeriod);
    return {
      medicine: formMedicine,
      dose: dose || undefined,
      timing: tN || undefined,
      tA: tA || undefined,
      tE: tE || undefined,
      medicineId: medicineId || m.id || null,
      duration: duration || '',
      period: period || null,
      periodAr: periodAr || null,
      required: !R.isEmpty(formMedicine),
    };
  });
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
      <Title>{t('medicine')}</Title>
      {newMedicine?.map((element, indx) => (
        <Container color="#f4f4f6" margin="0px 0px 2px 25px">
          <Medicine>
            <Ul>
              <Li>{element.medicine.name}</Li>
              <Div display="flex">
                <Div>
                  {element.dose}
                  &nbsp;
                </Div>
                <Div>{element.timing}&nbsp;</Div>
                <Div>for&nbsp;</Div>
                <Div>{element.duration}&nbsp;</Div>
                <Div>{element.period}</Div>
              </Div>
            </Ul>
          </Medicine>
          <Button onClick={() => removeItem(indx)}>{t('delete')}</Button>
        </Container>
      ))}
      <Divider />
      <Div
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="435px"
        ml="26px"
      >
        <Div>{t('nextAppointment')} </Div>
        <Div>{formatFullDay(nextAppointment?.date)}</Div>
        <Toggle onChange={setEnable} />
      </Div>
      <ReactToPrint
        trigger={() => (
          <FooterButton
            marginLeft="26px"
            bkColor="#50c7f2"
            color="#fbfbfb"
            width="content-fit"
            onClick={() => setDirection('rtl')}
          >
            {t('printArabic')}
          </FooterButton>
        )}
        content={() => ref.current}
      />
      <ReactToPrint
        trigger={() => (
          <FooterButton
            marginLeft="13px"
            bkColor="#50c7f2"
            color="#fbfbfb"
            width="content-fit"
            onClick={() => setDirection('ltr')}
          >
            {t('printEnglish')}
          </FooterButton>
        )}
        content={() => refTwo.current}
      />
      <Div style={{ overflow: 'hidden', height: '0px' }}>
        <PrescriptionPrintout
          ref={ref}
          mt={pageSetupRow?.top * 37.7952755906 || 0}
          mr={pageSetupRow?.right * 37.7952755906 || 0}
          mb={pageSetupRow?.bottom * 37.7952755906 || 0}
          ml={pageSetupRow?.left * 37.7952755906 || 0}
        >
          {newMedicine?.length === '0' ? (
            <Div>{t('noMedicines')}</Div>
          ) : (
            newMedicine?.map((element, indx) => (
              <PrintMedicine direction={direction}>
                <Ul>
                  <Li>{element.medicine.name}</Li>
                  <Div display="flex">
                    <Div>
                      {element.periodAr}
                      &nbsp;
                    </Div>
                    <Div>{element.duration}&nbsp;</Div>
                    <Div>لمده &nbsp;</Div>

                    <Div>{element.tA}&nbsp;</Div>

                    <Div>{element.dose}&nbsp;</Div>
                  </Div>
                </Ul>
              </PrintMedicine>
            ))
          )}
          {enable ? (
            <StyledFooterData>
              <H6 style={{ marginRight: '50px' }}>
                {formatFullDay(nextAppointment?.date)}
              </H6>
              <H6>{t('nextAppointment')}</H6>
            </StyledFooterData>
          ) : (
            <></>
          )}
        </PrescriptionPrintout>
        <PrescriptionPrintout
          mt={pageSetupRow?.top * 37.7952755906 || 0}
          mr={pageSetupRow?.right * 37.7952755906 || 0}
          mb={pageSetupRow?.bottom * 37.7952755906 || 0}
          ml={pageSetupRow?.left * 37.7952755906 || 0}
          ref={refTwo}
        >
          {newMedicine?.length === '0' ? (
            <Div>{t('noMedicines')}</Div>
          ) : (
            newMedicine?.map((element, indx) => (
              <PrintMedicine>
                <Div>{element.medicine.name}</Div>
                <Div display="flex">
                  <Div>
                    {element.dose}
                    &nbsp;
                  </Div>
                  <Div>{element.tE}&nbsp;</Div>
                  <Div>for&nbsp;</Div>
                  <Div>{element.duration}&nbsp;</Div>
                  <Div>{element.period}</Div>
                </Div>
              </PrintMedicine>
            ))
          )}
          {enable ? (
            <StyledFooterData>
              <Div display="flex" justifyContent="space-around">
                <H6 style={{ marginRight: '50px' }}>
                  {formatFullDay(nextAppointment?.date)}
                </H6>
                <H6>{t('nextAppointment')}</H6>
              </Div>
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
