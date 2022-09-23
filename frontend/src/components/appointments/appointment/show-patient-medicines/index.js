import React, { useMemo } from 'react';
import { Div } from 'components';
import { CRModal } from 'components';
import { useQuery } from '@apollo/client';
import * as R from 'ramda';
import { useMedicineDefinitions, useTimings } from 'hooks';
import { LIST_PATIENT_APPOINTMENTS } from 'apollo-client/queries';
import { APPT_STATUS } from 'utils/constants';
import { formatDate } from 'utils/date';
// import { ContainerStyled } from './style';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: '#1787e8',
        padding: '2px 0px 0px 0px',
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: '#1787e8',
        padding: '2px 0px 0px 0px',
      }}
      onClick={onClick}
    />
  );
}
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

function ShowMedicinines({ visible, onClose, patient }) {
  const header = useMemo(() => 'Show Medicines', []);
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

  return (
    <>
      <CRModal
        show={visible}
        header={header}
        onHide={onClose}
        onCancel={onClose}
        noFooter={true}
        CancelFooter={true}
        // CRContainer={ContainerStyled}
      >
        <Slider {...settings}>
          {FinishedMedicines.map(med => (
            <div>
              {med?.length === '0' ? (
                <Div>No Medicines</Div>
              ) : (
                med?.map((element, indx) => (
                  <Div mb={50}>
                    {indx === 0 && <Div mb={20}>Date: {element.date}</Div>}
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
            </div>
          ))}
        </Slider>
      </CRModal>
    </>
  );
}

ShowMedicinines.defaultProps = {
  type: 'create',
};

export default ShowMedicinines;
