import React, { useState, useEffect, useMemo } from 'react';
import * as R from 'ramda';
import NumberFormat from 'react-number-format';
import { Modal, Whisper, Tooltip } from 'rsuite';

import { Div, H6, CRNav, CRVDivider, H3, CRButton, CRTable } from 'components';
import { formatDate } from 'utils/date';
import { useModal } from 'components/widgets/modal';
import SummaryTable from '../../patients/summary-table';
import { capitalize } from 'utils/text';
// import { KeyStyled, ValueStyled } from './style';
import AppointmentGallery from '../images/gallery';
import AppointmentData from './appointment-data';
import useSuergriesAppointments from 'hooks/use-surgries-appoitnemtns';
import ListSurgeries from './list-surgeries';

// const renderProp = (key, value) => {
//   return (
//     <Div display="flex" alignItems="center" minHeight={60}>
//       <Whisper speaker={<Tooltip>{key}</Tooltip>} delayHide={0} delayShow={0}>
//         <KeyStyled color="texts.2">{capitalize(key)}</KeyStyled>
//       </Whisper>
//       <CRVDivider vertical />
//       <ValueStyled>{value}</ValueStyled>
//     </Div>
//   );
// };

const renderAppointment = data => {
  return data.map(({ value, field }, idx) => (
    <React.Fragment key={idx}>
      {/* {value && renderProp(field.name, value)} */}
    </React.Fragment>
  ));
};

const PatientSurgries = ({ patientId, tabularFields, tabularData }) => {
  const [activeSession, setActiveSession] = useState(null);
  const { surgeries } = useSuergriesAppointments({ patientId });

  // useEffect(() => {
  //   setActiveSession(R.propOr({}, '0')(surgries));
  // }, [surgries]);

  const [formValue, setFormValue] = useState({});
  const [apptFormValue, setApptFormValue] = useState({
    notes: '',
    prescription: '',
    collections: [],
  });
  const [disabled, setDisabled] = useState(false);
  const { visible, open, close } = useModal();
  const [activeTab, setActiveTab] = useState('0');
  // const { appointmentId } = useParams();

  // const appointment = useMemo(
  //   () => R.prop('appointment')(appointmentRes) || {},
  //   [appointmentRes]
  // );
  // const patient = useMemo(() => R.propOr({}, 'patient')(appointment), [
  //   appointment,
  // ]);

  // const {
  //   normalizedFields,
  //   appointmentHistory,
  //   viewFields,
  //   groups,
  // } = useAppointmentHistory({ appointmentId, appointment });

  // useEffect(() => {
  //   setFormValue(getFormInitValues(normalizedFields));
  // }, [normalizedFields]);

  // useEffect(() => {
  //   setApptFormValue({
  //     notes: R.propOr('', 'notes')(appointment),
  //     prescription: R.propOr('', 'prescription')(appointment),
  //     collections: R.propOr([], 'collections')(appointment),
  //   });
  // }, [appointment]);

  // const date = useMemo(() => R.propOr(new Date(), 'date')(activeSession), [
  //   activeSession,
  // ]);

  // const data = useMemo(() => R.propOr([], 'data')(activeSession), [
  //   activeSession,
  // ]);

  const surgriesIndex = useMemo(
    () => R.findIndex(R.propEq('id', R.prop('id')(activeSession)))(surgeries),
    [activeSession, surgeries]
  );

  const images = useMemo(() => {
    return R.pipe(
      R.propOr([], 'collections'),
      R.map(c =>
        c.images.map(i => ({ ...i, caption: c.caption, original: i.url }))
      ),
      R.flatten
    )(activeSession);
  }, [activeSession]);

  return (
    <Div>
      <Div px={5} py={2}>
        <ListSurgeries surgeries={surgeries} />
      </Div>
      <Div position="absolute" top={0} right={3}>
        <CRButton onClick={open} primary small>
          Table View
        </CRButton>
        <Modal show={visible} full onHide={close}>
          <Modal.Body>
            <SummaryTable data={tabularData} fields={tabularFields} />
          </Modal.Body>
        </Modal>
      </Div>
    </Div>
  );
};

PatientSurgries.defaultProps = {
  surgries: [],
};

export default PatientSurgries;
