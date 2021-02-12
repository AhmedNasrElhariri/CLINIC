import React, { useState, useCallback, useEffect, useMemo } from 'react';
import * as R from 'ramda';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Alert, Loader } from 'rsuite';

import { Div, PatientSummary, H3 } from 'components';
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
import useModal from 'hooks/use-model';

const normalTabs = ['Home', 'Summary', 'Surgries', 'Labs', 'History'];
const surgeryTabs = ['Home'];

function Appointment() {
  const history = useHistory();
  const [formValue, setFormValue] = useState({});
  const [apptFormValue, setApptFormValue] = useState({
    notes: '',
    prescription: '',
    collections: [],
  });
  const [disabled, setDisabled] = useState(false);
  const [activeTab, setActiveTab] = useState('0');
  const { appointmentId } = useParams();
  // const { data: appointmentRes, loading } = useQuery(GET_APPOINTMENT, {
  //   variables: {
  //     id: appointmentId,
  //   },
  //   onCompleted: ({ appointment }) => {
  //     setDisabled(isArchived(appointment));
  //   },
  // });
  const loading = false;
  const appointmentRes = {
    data: {
      appointment: {
        id: 'a1a1a36d-6a24-4483-ab75-c59f00d09165',
        type: 'Examination',
        date: '2021-02-04T17:25:02.557Z',
        status: 'Scheduled',
        notes: '',
        prescription: '',
        data: [
          {
            id: '4a34ad6e-8e6e-4ecd-a8c3-13412f167f9e',
            value: '',
            field: {
              id: '784b6815-9ddd-4bf5-9202-e460d8dad64d',
              name: 'et13',
              __typename: 'Field',
            },
            __typename: 'AppointmentField',
          },
          {
            id: 'c0a1a1e9-9e23-4264-a486-cc67db319ccd',
            value: 23232,
            field: {
              id: '8985d310-59be-4e78-9460-cf4cc534afee',
              name: 'et11',
              __typename: 'Field',
            },
            __typename: 'AppointmentField',
          },
          {
            id: 'df3bae25-9758-40b2-be4d-5f43fd662756',
            value: '',
            field: {
              id: 'd829ab5b-f183-4740-bf48-3e90fe31d65a',
              name: 'et12',
              __typename: 'Field',
            },
            __typename: 'AppointmentField',
          },
        ],
        patient: {
          id: '251c4faa-2e69-4ea0-a194-75376b6a5a0f',
          name: 'pateint one',
          age: 37,
          sex: 'Male',
          type: 'Primary',
          phoneNo: '01000000001',
          __typename: 'Patient',
        },
        collections: [],
        __typename: 'Appointment',
      },
    },
  };
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

  const onArchive = useCallback(() => {
    archive({
      variables: { id: appointmentId },
    });
  }, [archive, appointmentId]);

  const prescriptionBody = useMemo(() => {
    return R.propOr('', 'prescription')(apptFormValue);
  }, [apptFormValue]);

  const handlePrescriptionChange = useCallback(
    prescription =>
      setApptFormValue(R.mergeDeepRight(apptFormValue, { prescription })),
    [apptFormValue]
  );

  useEffect(() => {
    setFormValue(getFormInitValues(normalizedFields));
  }, [normalizedFields]);

  useEffect(() => {
    setApptFormValue({
      notes: R.propOr('', 'notes')(appointment),
      prescription: R.propOr('', 'prescription')(appointment),
      collections: R.propOr([], 'collections')(appointment),
    });
  }, [appointment]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Div display="flex">
      <Div flexGrow={1}>
        <HeaderStyled>
          <H3 mb={64}>Appointment</H3>
          {/*      <ButtonToolbar>
            <CRButton small primary onClick={open}>
              Prescription
              <Icon icon="add" />
            </CRButton>
            {isScheduled(appointment) && (
              <CRButton small primary onClick={onUpdate} disabled={disabled}>
                Save <Icon icon="save" />
              </CRButton>
            )}
            {(isScheduled(appointment) || isDone(appointment)) && (
              <Can I="archive" an="Appointment">
                <CRButton small primary onClick={onArchive} disabled={disabled}>
                  Archive <Icon icon="archive" />
                </CRButton>
              </Can>
            )}
          </ButtonToolbar> */}
        </HeaderStyled>
        <Div display="flex">
          <Div flexGrow={1}>
            <Div py={3} bg="white">
              <AppointmentData
                disabled={disabled}
                formValue={formValue}
                appointmentFormValue={apptFormValue}
                onChangeAppointment={setApptFormValue}
                onChange={setFormValue}
                groups={groups}
                appointment={appointment}
              />
              {appointment.type !== 'Surgery' && showComp('1') && (
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
              )}
              {appointment.type !== 'Surgery' && showComp('3') && (
                <PatientLabs patient={patient} />
              )}
              {appointment.type !== 'Surgery' && showComp('4') && (
                <History patient={patient} />
              )}
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
