import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import * as R from 'ramda';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Alert, Panel, Button } from 'rsuite';
import Prescription from './prescription';
import { useTranslation } from 'react-i18next';
import Labs from './labs/index';
import Images from './images';
import ShowMedicinines from './show-patient-medicines';
import ShowPatientInfo from './show-patient-info';
import NewAppointment from './new-appointment';
import { Div } from 'components';
import AppointmentData from './appointment-data';
import {
  getFormInitValues,
  mapFormValueToAppointmentData,
  mapSessionValues,
  isArchived,
} from 'services/appointment';
import {
  GET_APPOINTMENT,
  UPDATE_APPOINTMENT,
  LIST_PATIENT_APPOINTMENTS,
} from 'apollo-client/queries';

import useAppointmentHistory from './fetch-appointment-history';
import { useForm, useModal } from 'hooks';
import { APPT_STATUS } from 'utils/constants';
import { StyledPanel } from './style';
import AppointmentHeader from './appointment-header';

const sortByDate = R.sortBy(R.compose(R.prop('date')));
function Appointment() {
  const { visible, open, close } = useModal();
  const { type, setType } = useForm({});
  const [sessionsPulses, setSessionsPulses] = useState([]);
  const [sessionFormValue, setSessionFormValue] = useState({});
  const { visible: visbleAppointment, toggle: toggleAppointment } = useModal();

  const [formValue, setFormValue] = useState({});
  const [apptFormValue, setApptFormValue] = useState({
    notes: '',
    prescription: [],
    medicine: [],
    labIds: [],
    imageIds: [],
    pictures: [],
    powerOne: 0,
    powerTwo: 0,
    pulses: 0,
    selectedMedicines: [],
  });
  const [disabled, setDisabled] = useState(false);
  const { appointmentId } = useParams();
  // const dir = get('dir');
  // let cardPosition = {};
  // dir === 'ltr'
  //   ? (cardPosition = {
  //       position: 'absolute',
  //       top: '130px',
  //       right: '20px',
  //       width: 240,
  //     })
  //   : (cardPosition = {
  //       position: 'absolute',
  //       top: '130px',
  //       left: '20px',
  //       width: 240,
  //     });
  const [update] = useMutation(UPDATE_APPOINTMENT, {
    onCompleted: () => {
      Alert.success('Appointment has been updates successfully');
    },
    refetchQueries: () => [
      {
        query: GET_APPOINTMENT,
        variables: { id: appointmentId },
      },
    ],
  });
  const { data: appointmentRes } = useQuery(GET_APPOINTMENT, {
    variables: {
      id: appointmentId,
    },
    onCompleted: ({ appointment }) => {
      setDisabled(isArchived(appointment));
    },
  });
  const appointment = useMemo(
    () => R.propOr({}, 'appointment')(appointmentRes),
    [appointmentRes]
  );
  const patient = useMemo(
    () => R.propOr({}, 'patient')(appointment),
    [appointment]
  );
  const { normalizedFields, groups } = useAppointmentHistory({
    appointmentId,
    appointment,
  });
  const handleUpdate = useCallback(() => {
    update({
      variables: {
        appointment: {
          data: mapFormValueToAppointmentData(normalizedFields, formValue),
          notes: apptFormValue.notes,
          prescription: apptFormValue.prescription,
          labIds: apptFormValue.labIds,
          imageIds: apptFormValue.imageIds,
          powerOne: apptFormValue.powerOne,
          powerTwo: apptFormValue.powerTwo,
          pulses: apptFormValue.pulses,
          pictures: apptFormValue.pictures.map(c => ({
            ...R.pick(['id', 'comment'])(c),
          })),
          id: appointmentId,
          sessionsPulses: mapSessionValues(sessionsPulses, sessionFormValue),
        },
      },
    });
  }, [
    update,
    normalizedFields,
    formValue,
    apptFormValue,
    appointmentId,
    sessionsPulses,
    sessionFormValue,
  ]);
  const [popup, setPopup] = useState(false);
  const [popupTwo, setPopupTwo] = useState(false);
  const [popupThree, setPopupThree] = useState(false);
  const [popupFour, setPopupFour] = useState(false);
  const [popupFive, setPopupFive] = useState(false);
  const handleClickCreate = useCallback(() => {
    setPopupTwo(false);
    setPopupThree(false);
    setPopupFour(false);
    setPopupFive(false);
    setPopup(true);
    setType('create');
    open();
  }, [open, setType]);
  const handleClickCreateTwo = useCallback(() => {
    setPopup(false);
    setPopupThree(false);
    setPopupFour(false);
    setPopupFive(false);
    setPopupTwo(true);
    setType('create');
    open();
  }, [open, setType]);
  const handleClickCreateThree = useCallback(() => {
    setPopupTwo(false);
    setPopup(false);
    setPopupFour(false);
    setPopupFive(false);
    setPopupThree(true);
    setType('create');
    open();
  }, [open, setType]);

  const handleClickCreateFour = useCallback(() => {
    setPopupTwo(false);
    setPopup(false);
    setPopupThree(false);
    setPopupFive(false);
    setPopupFour(true);
    setType('create');
    open();
  }, [open, setType]);

  const handleShowPatientInfo = useCallback(() => {
    setPopupTwo(false);
    setPopup(false);
    setPopupThree(false);
    setPopupFour(false);
    setPopupFive(true);
    setType('patientInfo');
    open();
  }, [open, setType]);

  useEffect(() => {
    setFormValue(getFormInitValues(normalizedFields));
  }, [normalizedFields]);

  useEffect(() => {
    setApptFormValue(val => ({
      ...val,
      notes: R.propOr('', 'notes')(appointment),
      prescription: R.propOr([], 'prescription')(appointment),
      powerOne: R.propOr(0, 'powerOne')(appointment),
      powerTwo: R.propOr(0, 'powerTwo')(appointment),
      pulses: R.propOr(0, 'pulses')(appointment),
      pictures: R.propOr([], 'pictures')(appointment),
      labIds: R.pipe(
        R.propOr([], 'labs'),
        R.map(R.path(['labDefinition', 'id']))
      )(appointment),
      imageIds: R.pipe(
        R.propOr([], 'images'),
        R.map(R.path(['imageDefinition', 'id']))
      )(appointment),
    }));
  }, [appointment]);

  useEffect(() => {
    setSessionsPulses(R.propOr([], 'sessionsPulses')(appointment));
  }, [appointment]);
  useEffect(() => {
    const sessionsFormValueUpdated = sessionsPulses.reduce(function (
      result,
      item
    ) {
      let key = item.name;
      result[key] = item.value;
      return result;
    },
    {});
    setSessionFormValue(sessionsFormValueUpdated);
  }, [sessionsPulses, setSessionFormValue]);

  //useEffect Warning
  useEffect(() => {
    let totalPulses = 0;
    for (const session in sessionFormValue) {
      totalPulses += sessionFormValue[session];
    }
    setApptFormValue({ ...apptFormValue, pulses: totalPulses });
  }, [sessionFormValue]);

  const handleMedicineChange = useCallback(
    newPrescription => {
      setApptFormValue({
        ...apptFormValue,
        prescription: newPrescription,
      });
    },
    [apptFormValue, setApptFormValue]
  );
  const handleLabsChange = useCallback(
    newLabs => {
      setApptFormValue({
        ...apptFormValue,
        labIds: newLabs,
      });
    },
    [apptFormValue, setApptFormValue]
  );
  const handleImagesChange = useCallback(
    Images => {
      setApptFormValue({
        ...apptFormValue,
        imageIds: Images,
      });
    },
    [apptFormValue, setApptFormValue]
  );
  const { data } = useQuery(LIST_PATIENT_APPOINTMENTS, {
    variables: {
      patientId: patient.id,
      status: APPT_STATUS.SCHEDULED,
    },
  });
  const patientAppointments = R.propOr([], 'patientAppointments')(data);
  const sortedPatientAppointments = sortByDate(patientAppointments);
  const appoint = R.propOr('', 'appointment')(appointmentRes);
  const appointId = R.propOr('', 'id')(appoint);
  const indx = sortedPatientAppointments.findIndex(pA => pA.id === appointId);
  const nextAppointment = patientAppointments[indx + 1];
  const { t } = useTranslation();
  const printRef = useRef();

  return (
    <>
      <Div display="flex">
        <Div flexGrow={1}>
          <Div display="flex">
            <Div flexGrow={1}>
              <Div py={3} bg="white" className="relative">
                <AppointmentHeader
                  handleClickCreateFour={handleClickCreateFour}
                  disabled={disabled}
                  handleClickCreate={handleClickCreate}
                  handleClickCreateThree={handleClickCreateThree}
                  handleClickCreateTwo={handleClickCreateTwo}
                  handleUpdate={handleUpdate}
                  setDisabled={setDisabled}
                  printRef={printRef}
                  t={t}
                />

                <Panel
                  shaded
                  bordered
                  bodyFill
                  className="mt-5 sm:absolute right-5 top-20 w-64"
                >
                  <StyledPanel header={patient?.name}>
                    <p>
                      <small>
                        <Div display="flex">
                          <Div width="50px" mr="30px">
                            {t('phoneNo')}
                          </Div>
                          <Div>{patient?.phoneNo}</Div>
                        </Div>
                        <Div display="flex">
                          <Div width="50px" mr="30px">
                            {t('sex')}
                          </Div>
                          <Div>{patient?.sex}</Div>
                        </Div>
                        <Div
                          display="flex"
                          onClick={() => handleShowPatientInfo()}
                          mt="2px"
                        >
                          <Div width="50px" mr="30px" mt={10}>
                            <Button appearance="link">{t('more')}</Button>
                          </Div>
                        </Div>
                      </small>
                    </p>
                  </StyledPanel>
                </Panel>
                <AppointmentData
                  disabled={disabled}
                  formValue={formValue}
                  appointmentFormValue={apptFormValue}
                  onDataChange={setFormValue}
                  onChange={setApptFormValue}
                  groups={groups}
                  appointment={appointment}
                  sessionsPulses={sessionsPulses}
                  setSessionsPulses={setSessionsPulses}
                  sessionFormValue={sessionFormValue}
                  setSessionFormValue={setSessionFormValue}
                  handleShowPatientInfo={handleShowPatientInfo}
                />
                <Prescription
                  visible={visible}
                  onClose={close}
                  type={type}
                  medicine={apptFormValue.prescription}
                  onChange={handleMedicineChange}
                  nextAppointment={nextAppointment}
                  printRef={printRef}
                />
                {popupTwo && (
                  <Labs
                    visible={visible}
                    onClose={close}
                    type={type}
                    labs={apptFormValue.labIds}
                    onChange={handleLabsChange}
                  />
                )}
                {popupThree && (
                  <Images
                    visible={visible}
                    onClose={close}
                    type={type}
                    images={apptFormValue.imageIds}
                    onChange={handleImagesChange}
                  />
                )}
                {popupFour && (
                  <ShowMedicinines
                    visible={visible}
                    onClose={close}
                    type={type}
                    patient={patient}
                  />
                )}
                {popupFive && (
                  <ShowPatientInfo
                    visible={visible}
                    onClose={close}
                    type={type}
                    patient={patient}
                  />
                )}
                <NewAppointment
                  show={visbleAppointment}
                  onHide={toggleAppointment}
                  appointment={appointment}
                />
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
    </>
  );
}

export default Appointment;
