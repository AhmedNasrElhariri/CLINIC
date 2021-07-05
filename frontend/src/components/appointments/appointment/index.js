import React, { useState, useCallback, useEffect, useMemo } from 'react';
import * as R from 'ramda';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Alert, Loader, Icon } from 'rsuite';

import Prescription from './prescription';

import Labs from './labs/index';
import Images from './images';
import NewAppointment from './new-appointment';
import { Div, H3, CRButton } from 'components';
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
import { HeaderStyled } from './style';
import { useForm, useModal } from 'hooks';
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
    powerTwo:0,
    pulses:0,
  });

  const [disabled, setDisabled] = useState(false);
  const { appointmentId } = useParams();
  const { data: appointmentRes, loading } = useQuery(GET_APPOINTMENT, {
    variables: {
      id: appointmentId,
    },
    onCompleted: ({ appointment }) => {
      setDisabled(isArchived(appointment));
    },
  });
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

  const appointment = useMemo(
    () => R.prop('appointment')(appointmentRes) || {},
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
  console.log(apptFormValue);
  const handleUpdate = useCallback(() => {
    update({
      variables: {
        appointment: {
          data: mapFormValueToAppointmentData(normalizedFields, formValue),
          notes: apptFormValue.notes,
          prescription: apptFormValue.prescription,
          labIds: apptFormValue.labIds,
          imageIds: apptFormValue.imageIds,
          powerOne:apptFormValue.powerOne,
          powerTwo:apptFormValue.powerTwo,
          pulses:apptFormValue.pulses,
          pictures: apptFormValue.pictures.map(c => ({
            ...R.pick(['id', 'comment'])(c),
          })),
          id: appointmentId,
          sessionsPulses: mapSessionValues(sessionsPulses, sessionFormValue),
        },
      },
    });
  }, [update, normalizedFields, formValue, apptFormValue, appointmentId,sessionsPulses,
    sessionFormValue]);
  const [popup, setPopup] = useState(false);
  const [popupTwo, setPopupTwo] = useState(false);
  const [popupThree, setPopupThree] = useState(false);
  const handleClickCreate = useCallback(() => {
    setPopupTwo(false);
    setPopupThree(false);
    setPopup(true);
    setType('create');
    open();
  }, [open, setType]);
  const handleClickCreateTwo = useCallback(() => {
    setPopup(false);
    setPopupThree(false);
    setPopupTwo(true);
    setType('create');
    open();
  }, [open, setType]);
  const handleClickCreateThree = useCallback(() => {
    setPopupTwo(false);
    setPopup(false);
    setPopupThree(true);
    setType('create');
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
    },
  });
  const patientAppointments = R.propOr([], 'patientAppointments')(data);
  const sortedPatientAppointments = sortByDate(patientAppointments);
  const appoint = R.propOr('', 'appointment')(appointmentRes);
  const appointId = R.propOr('', 'id')(appoint);
  const indx = sortedPatientAppointments.findIndex(pA => pA.id === appointId);
  const nextAppointment = patientAppointments[indx + 1];
  if (loading) {
    return <Loader />;
  }
  return (
    <Div display="flex">
      <Div flexGrow={1}>
        <HeaderStyled>
          <H3 mb={64}>Appointment</H3>
          <Div>
            <CRButton
              variant="primary"
              onClick={handleClickCreate}
              disabled={disabled}
            >
              PrintMedicines <Icon icon="print" />
            </CRButton>
            <CRButton
              variant="primary"
              onClick={handleClickCreateThree}
              disabled={disabled}
            >
              images <Icon icon="print" />
            </CRButton>
            <CRButton
              variant="primary"
              onClick={handleClickCreateTwo}
              disabled={disabled}
            >
              PrintLabs <Icon icon="print" />
            </CRButton>
            <CRButton
              variant="primary"
              onClick={handleUpdate}
              disabled={disabled}
            >
              Save <Icon icon="save" />
            </CRButton>
            <CRButton
              variant="primary"
              open={visbleAppointment}
              onClick={toggleAppointment}
            >
              Reverse Appoinment <Icon icon="save" />
            </CRButton>
          </Div>
        </HeaderStyled>
        <Div display="flex">
          <Div flexGrow={1}>
            <Div py={3} bg="white">
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
              />
              {popup && (
                <Prescription
                  visible={visible}
                  onClose={close}
                  type={type}
                  medicine={apptFormValue.prescription}
                  onChange={handleMedicineChange}
                  nextAppointment={nextAppointment}
                />
              )}
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
  );
}

export default Appointment;
