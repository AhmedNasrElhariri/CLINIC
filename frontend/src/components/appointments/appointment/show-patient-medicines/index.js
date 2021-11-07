import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
} from 'react';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { Div } from 'components';
import { CRModal } from 'components';
import { useQuery } from '@apollo/client';
import * as R from 'ramda';
import { useMedicineDefinitions, useTimings } from 'hooks';
import { LIST_PATIENT_APPOINTMENTS } from 'apollo-client/queries';
import { APPT_STATUS } from 'utils/constants';
import { CRButton } from 'components/widgets';
import { formatDate } from 'utils/date';
import { ButtonsContainer, StyledImage, ContainerStyled } from './style';

function ShowMedicinines({ visible, onClose, patient }) {
  const header = useMemo(() => 'Show Medicines', []);
  const ref = useRef();
  const [url, setUrl] = useState();
  const [med, setMed] = useState([]);
  const { medicineDefinitions } = useMedicineDefinitions();
  const { timings } = useTimings();
  const { data } = useQuery(LIST_PATIENT_APPOINTMENTS, {
    variables: {
      patientId: patient.id,
      status: APPT_STATUS.ARCHIVED,
    },
  });
  let patientMedicines = [];
  const patientAppointments = R.propOr([], 'patientAppointments')(data);
  patientAppointments.forEach(a => {
    const m = R.propOr([], 'prescription')(a);
    const date = R.propOr([], 'date')(a);
    const prescription = { med: m, date: date };
    patientMedicines.push(prescription);
  });
  const FinishedMedicines = patientMedicines.map(({ med, date }) => {
    return med.map((m, idx) => {
      const formMedicine =
        medicineDefinitions.find(f => f.id === m.medicineId) || {};
      const { dose, timingId, duration, period } = m;
      let specificTiming = timings.find(t => t.id === timingId);
      const tN = R.propOr('', 'name')(specificTiming);
      const tA = R.propOr('', 'arabicPrintValue')(specificTiming);
      const tE = R.propOr('', 'englishPrintValue')(specificTiming);
      return {
        medicine: formMedicine,
        dose: dose || undefined,
        timing: tN || undefined,
        tA: tA || undefined,
        tE: tE || undefined,
        duration: duration || '',
        period: period || null,
        date: formatDate(date),
      };
    });
  });
  useEffect(() => {
    if (FinishedMedicines.length > 0) {
      setMed(FinishedMedicines[0]);
    }
  }, [FinishedMedicines.length]);
  const onButtonClick = useCallback(async () => {
    if (ref?.current === null) {
      return;
    }
    const link = await toPng(ref?.current, { cacheBust: true });
    setUrl(link);
  }, [url, ref, med]);
  return (
    <>
      <CRModal
        show={visible}
        header={header}
        onHide={onClose}
        onCancel={onClose}
        noFooter={true}
        CancelFooter={true}
        CRContainer={ContainerStyled}
      >
        <ButtonsContainer>
          {FinishedMedicines.map((m, indx) => (
            <CRButton
              onClick={() => {
                setMed(FinishedMedicines[indx]);
                onButtonClick();
              }}
              mr={10}
            >
              {indx}
            </CRButton>
          ))}
        </ButtonsContainer>
        <Div style={{ overflow: 'hidden', height: '0px' }}>
          <Div ref={ref}>
            {med?.length === '0' ? (
              <Div>No Medicines</Div>
            ) : (
              med?.map((element, indx) => (
                <Div mb={10}>
                  <Div mb={20}>Date: {element.date}</Div>
                  <Div>{element.medicine.name}</Div>
                  <Div display="flex">
                    <Div>
                      {element.period}
                      &nbsp;
                    </Div>
                    <Div>{element.duration}&nbsp;</Div>
                    <Div>لمده &nbsp;</Div>
                    {element.tE?.includes(' ') ? (
                      <>
                        <Div>{element.tE.split(' ')[1]}&nbsp;</Div>
                        <Div>{element.tE.split(' ')[0]}&nbsp;</Div>
                      </>
                    ) : (
                      <Div>{element.tA}&nbsp;</Div>
                    )}
                    {element.dose?.includes(' ') ? (
                      <>
                        <Div>{element.dose.split(' ')[1]}&nbsp;</Div>
                        <Div>{element.dose.split(' ')[0]}&nbsp;</Div>
                      </>
                    ) : (
                      <Div>{element.dose}&nbsp;</Div>
                    )}
                  </Div>
                </Div>
              ))
            )}
          </Div>
        </Div>
        <Div ml={10} mb={20}>
          {<StyledImage src={url} alt="image" />}
        </Div>
      </CRModal>
    </>
  );
}

ShowMedicinines.defaultProps = {
  type: 'create',
};

export default ShowMedicinines;
