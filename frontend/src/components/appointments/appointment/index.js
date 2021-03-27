import React, { useState, useCallback, useEffect, useMemo } from 'react';
import * as R from 'ramda';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Alert, Loader, Icon } from 'rsuite';
import Prescription from './prescription/index.js';
import Labs from './labs/index';
import Images from './images';
import NewAppointment from './new-appointment';

import { Div, H3, CRButton } from 'components';
import AppointmentData from './appointment-data';

import {
  getFormInitValues,
  mapFormValueToAppointmentData,
  isArchived,
} from 'services/appointment';

import {
  GET_APPOINTMENT,
  UPDATE_APPOINTMENT,
  LIST_PATIENT_APPOINTMENTS,
} from 'apollo-client/queries';

import useAppointmentHistory from './fetch-appointment-history';

import { HeaderStyled } from './style';

import useFrom from 'hooks/form';
import useModal from 'hooks/use-model';

function Appointment() {
  const { visible, open, close } = useModal();
  const { type, setType } = useFrom({});

  const { visible: visbleAppointment, toggle: toggleAppointment } = useModal();

  const [formValue, setFormValue] = useState({});
  const [apptFormValue, setApptFormValue] = useState({
    notes: '',
    prescription: [],
    medicine: [],
    labIds: [],
    imageIds: [],
    collections: [],
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
  const patient = useMemo(() => R.propOr({}, 'patient')(appointment), [
    appointment,
  ]);
  const { normalizedFields, groups } = useAppointmentHistory({
    appointmentId,
    appointment,
  });

  const onUpdate = useCallback(() => {
    update({
      variables: {
        appointment: {
          data: mapFormValueToAppointmentData(normalizedFields, formValue),
          notes: apptFormValue.notes,
          prescription: apptFormValue.prescription,
          labIds: apptFormValue.labIds,
          imageIds: apptFormValue.imageIds,
          collections: apptFormValue.collections.map(c => ({
            ...R.pick(['id', 'caption'])(c),
            images: R.map(R.pick(['id', 'comment']))(c.images),
          })),
          id: appointmentId,
        },
      },
    });
  }, [update, normalizedFields, formValue, apptFormValue, appointmentId]);
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
      collections: R.propOr([], 'collections')(appointment),
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
  const handleMedicineChange = useCallback(
    medicine => {
      setApptFormValue({
        ...apptFormValue,
        medicine,
      });
    },
    [apptFormValue, setApptFormValue]
  );
  const handleLabsChange = useCallback(
    labs => {
      setApptFormValue({
        ...apptFormValue,
        labs,
      });
    },
    [apptFormValue, setApptFormValue]
  );
  const handleImagesChange = useCallback(
    images => {
      setApptFormValue({
        ...apptFormValue,
        images,
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
  const nextAppointment = patientAppointments[1];

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
            <CRButton variant="primary" onClick={onUpdate} disabled={disabled}>
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
                onChange={setApptFormValue}
                groups={groups}
                appointment={appointment}
              />
              {popup ? (
                <Prescription
                  visible={visible}
                  onClose={close}
                  type={type}
                  medicine={apptFormValue.medicine}
                  onChange={handleMedicineChange}
                  nextAppointment={nextAppointment}
                />
              ) : (
                <></>
              )}
              {popupTwo ? (
                <Labs
                  visible={visible}
                  onClose={close}
                  type={type}
                  labs={apptFormValue.labs}
                  onChange={handleLabsChange}
                />
              ) : (
                <></>
              )}
              {popupThree ? (
                <Images
                  visible={visible}
                  onClose={close}
                  type={type}
                  images={apptFormValue.images}
                  onChange={handleImagesChange}
                />
              ) : (
                <></>
              )}
              <NewAppointment
                show={visbleAppointment}
                onHide={toggleAppointment}
                patientid={patient.id}
                userid={appointment.userId}
              />
            </Div>
          </Div>
        </Div>
      </Div>
    </Div>
  );
}

export default Appointment;
