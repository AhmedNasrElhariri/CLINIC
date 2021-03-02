import React, { useState, useCallback, useEffect, useMemo } from 'react';
import * as R from 'ramda';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Alert, Loader, Icon } from 'rsuite';

import Prescription from './prescription/index.js';
import Labs from './labs/index';
import NewAppointment from './new-appointment';


import { Div, PatientSummary, H3, CRButton } from 'components';
import AppointmentData from './appointment-data';
import PatientLabs from './patient-labs';

import {
  getFormInitValues,
  mapFormValueToAppointmentData,
  isArchived,
} from 'services/appointment';

import {
  GET_APPOINTMENT,
  UPDATE_APPOINTMENT,
  ARCHIVE_APPOINTMENT,
} from 'apollo-client/queries';

import useAppointmentHistory from './fetch-appointment-history';
import History from './patient-history';

import { HeaderStyled } from './style';
import PatientSurgries from './surgries';

import useFrom from 'hooks/form';
import useModal from 'hooks/use-model';

const normalTabs = ['Home', 'Summary', 'Surgries', 'Labs', 'History'];
const surgeryTabs = ['Home'];

function Appointment() {
  const history = useHistory();

  const { visible, open, close } = useModal();
  const { type, setType } = useFrom({});
  
  const { visible: visbleAppointment, toggle: toggleAppointment } = useModal();

  const [formValue, setFormValue] = useState({});
  const [apptFormValue, setApptFormValue] = useState({
    notes: '',
    prescription: '',
    medicine: [],
    labs:[],
    collections: [],
  });
  const [disabled, setDisabled] = useState(false);
  const [activeTab, setActiveTab] = useState('0');
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

  const [archive] = useMutation(ARCHIVE_APPOINTMENT, {
    onCompleted: () => {
      Alert.success('Appointment has been Archived successfully');
      setDisabled(true);
      history.push('/appointments/today');
    },
  });
  const appointment = useMemo(
    () => R.prop('appointment')(appointmentRes) || {},
    [appointmentRes]
  );
  const tabs = useMemo(
    () => (appointment.type === 'Surgery' ? surgeryTabs : normalTabs),
    [appointment.type]
  );
  const patient = useMemo(() => R.propOr({}, 'patient')(appointment), [
    appointment,
  ]);
  const {
    normalizedFields,
    appointmentHistory,
    viewFields,
    groups,
  } = useAppointmentHistory({ appointmentId, appointment });

  const showComp = useCallback(idx => activeTab === idx, [activeTab]);
  const onUpdate = useCallback(() => {
    update({
      variables: {
        appointment: {
          data: mapFormValueToAppointmentData(normalizedFields, formValue),
          notes: apptFormValue.notes,
          prescription: apptFormValue.prescription,
          collections: apptFormValue.collections.map(c => ({
            ...R.pick(['id', 'caption'])(c),
            images: R.map(R.pick(['id', 'comment']))(c.images),
          })),
          id: appointmentId,
        },
      },
    });
  }, [update, normalizedFields, formValue, apptFormValue, appointmentId]);
  const [popup,setPopup] = useState(false);
  const [popupTwo,setPopupTwo] = useState(false);
  const handleClickCreate = useCallback(() => {
    setPopupTwo(false);
    setPopup(true);
    setType('create');
    open();
  }, [open, setType]);
  const handleClickCreateTwo = useCallback(() => {
    setPopup(false);
    setPopupTwo(true);
    setType('create');
    open();
  }, [open, setType]);

  const onArchive = useCallback(() => {
    archive({
      variables: { id: appointmentId },
    });
  }, [archive, appointmentId]);

  const prescriptionBody = useMemo(() => {
    return R.propOr('', 'prescription')(apptFormValue);
  }, [apptFormValue]);

  // const handlePrescriptionChange = useCallback(
  //   prescription =>
  //     setApptFormValue(R.mergeDeepRight(apptFormValue, { prescription })),
  //   [apptFormValue]
  // );

  useEffect(() => {
    setFormValue(getFormInitValues(normalizedFields));
  }, [normalizedFields]);

  useEffect(() => {
    setApptFormValue({
      notes: R.propOr('', 'notes')(appointment),
      prescription: R.propOr('', 'prescription')(appointment),
      collections: R.propOr([], 'collections')(appointment),
      medicine: R.propOr([], 'medicine')(appointment),
      labs: R.propOr([], 'medicine')(appointment),
    });
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
  if (loading) {
    return <Loader />;
  }
  return (
    <Div display="flex">
      <Div flexGrow={1}>
        <HeaderStyled>
          <H3 mb={64}>Appointment</H3>
          {/* <ButtonToolbar> */}
          {/* <CRButton small primary onClick={open}>
              Prescription
              <Icon icon="add" />
            </CRButton> */}
          {/* {isScheduled(appointment) && ( */}
          <CRButton
            small
            primary
            onClick={handleClickCreate}
            disabled={disabled}
          >
            PrintMedicines <Icon icon="print" />
          </CRButton>
          <CRButton
            small
            primary
            onClick={handleClickCreateTwo}
            disabled={disabled}
          >
            PrintLabs <Icon icon="print" />
          </CRButton>
          <CRButton small primary onClick={onUpdate} disabled={disabled}>
            Save <Icon icon="save" />
          </CRButton>
          <CRButton small primary open={visbleAppointment} onClick={toggleAppointment}>
            Reverse Appoinment <Icon icon="save" />
          </CRButton>
          {/* )} */}
          {/* {(isScheduled(appointment) || isDone(appointment)) && (
              <Can I="archive" an="Appointment">
                <CRButton small primary onClick={onArchive} disabled={disabled}>
                  Archive <Icon icon="archive" />
                </CRButton>
              </Can>
            )} */}
          {/* </ButtonToolbar> */}
        </HeaderStyled>
        <Div display="flex">
          <Div flexGrow={1}>
            <Div py={3} bg="white">
              <AppointmentData
                disabled={disabled}
                formValue={formValue}
                appointmentFormValue={apptFormValue}
                onChangeAppointment={setApptFormValue}
                onChange={ch => {
                  console.log(ch);
                  setFormValue(ch);
                }}
                groups={groups}
                appointment={appointment}
              />
              {popup ? 
              <Prescription
                visible={visible}
                onClose={close}
                type={type}
                medicine={apptFormValue.medicine}
                onChange={handleMedicineChange}
              /> : <></>}
              {popupTwo ?
              <Labs
                visible={visible}
                onClose={close}
                type={type}
                labs={apptFormValue.labs}
                onChange={handleLabsChange}
              /> :<></> }
              <NewAppointment show={visbleAppointment} onHide={toggleAppointment} patientid={patient.id} userid={appointment.userId}/>
              {/* {appointment.type !== 'Surgery' && showComp('1') && (
                <PatientSummary
                  summary={appointmentHistory}
                  fields={viewFields}
                />
              )}
              {appointment.type !== 'Surgery' && showComp('2') && (
                <PatientSurgries
                  history={appointmentHistory}
                  viewFields={viewFields}
                  patientId={appointment?.patient?.id}
                />
              )} */}
              {/* {appointment.type !== 'Surgery' && showComp('3') && (
                <PatientLabs patient={patient} />
              )}
              {appointment.type !== 'Surgery' && showComp('4') && (
                <History patient={patient} />
              )} */}
            </Div>
          </Div>
        </Div>
      </Div>
      {/*   <Prescription
        visible={visible}
        patient={patient}
        onClose={close}
        content={prescriptionBody}
        onChange={handlePrescriptionChange}
      /> */}
    </Div>
  );
}

export default Appointment;
