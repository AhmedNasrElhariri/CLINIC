import React, { useState, useCallback, useEffect, useMemo } from 'react';
import * as R from 'ramda';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { ButtonToolbar, Icon, Alert } from 'rsuite';

import {
  GET_APPOINTMENT,
  UPDATE_APPOINTMENT,
  ARCHIVE_APPOINTMENT,
} from 'apollo-client/queries';

import {
  Div,
  PatientProgress,
  PatientSummary,
  H3,
  CRButton,
  PatientInfo,
} from 'components';
import AppointmentData from './appointment-data';
import Prescription from './prescription';
import PatientLabs from './patient-labs';

import {
  getFormInitValues,
  mapFormValueToAppointmentData,
  isArchived,
  isScheduled,
  isDone,
} from 'services/appointment';

import useAppointmentHistory from './fetch-appointment-history';
import History from './patient-history';
import CRNav from '../../widgets/nav/normal';
import useFetchAccountingData from 'components/accounting/accounting-container/fetch-data';

const tabs = ['Home', 'Summary', 'Progress', 'Labs', 'History'];

function Appointment() {
  const history = useHistory();
  const [formValue, setFormValue] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [isPrescriptionVisible, setPrescriptionVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const { appointmentId } = useParams();
  const { refetchRevenues } = useFetchAccountingData();
  const { data: appointmentRes } = useQuery(GET_APPOINTMENT, {
    variables: {
      id: appointmentId,
    },
    // fetchPolicy: 'no-cache',
    onCompleted: ({ appointment }) => {
      setFormValue(R.pick(['labs'])(appointment));
      setDisabled(isArchived(appointment));
    },
  });
  const [update] = useMutation(UPDATE_APPOINTMENT, {
    onCompleted: () => {
      Alert.success('Appointment has been updates successfully');
    },
  });

  const [archive] = useMutation(ARCHIVE_APPOINTMENT, {
    refetchQueries: () => [refetchRevenues()],
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
          id: appointmentId,
        },
      },
    });
  }, [update, normalizedFields, formValue, appointmentId]);

  const onArchive = useCallback(() => {
    archive({
      variables: { id: appointmentId },
    });
  }, [archive, appointmentId]);

  const prescriptionField = useMemo(() => {
    const field = R.find(R.where({ field: R.propEq('name', 'Prescription') }))(
      Object.values(normalizedFields)
    );
    return R.propOr({}, 'field')(field);
  }, [normalizedFields]);

  const prescriptionBody = useMemo(() => {
    return formValue[R.propOr('', 'id')(prescriptionField)];
  }, [formValue, prescriptionField]);

  useEffect(() => {
    setFormValue(getFormInitValues(normalizedFields));
  }, [normalizedFields]);

  return (
    <Div display="flex">
      <Div flexGrow={1}>
        <Div display="flex" justifyContent="space-between">
          <H3 mb={64}>Appointment</H3>
          <ButtonToolbar>
            <CRButton
              small
              primary
              onClick={() => setPrescriptionVisible(true)}
            >
              Prescription
              <Icon icon="add" />
            </CRButton>
            {isScheduled(appointment) && (
              <CRButton small primary onClick={onUpdate} disabled={disabled}>
                Save <Icon icon="save" />
              </CRButton>
            )}
            {(isScheduled(appointment) || isDone(appointment)) && (
              <CRButton small primary onClick={onArchive} disabled={disabled}>
                Archive <Icon icon="archive" />
              </CRButton>
            )}
          </ButtonToolbar>
        </Div>
        <Div display="flex">
          <Div flexGrow={1}>
            <Div display="flex" justifyContent="space-between">
              <CRNav
                appearance="tabs"
                activeKey={activeTab}
                onSelect={setActiveTab}
                style={{ width: 780 }}
              >
                {tabs.map((t, idx) => (
                  <CRNav.CRItem eventKey={idx + ''} key={idx}>
                    {t}
                  </CRNav.CRItem>
                ))}
              </CRNav>
            </Div>
            <Div py={3} bg="white">
              {showComp('0') && (
                <AppointmentData
                  disabled={disabled}
                  formValue={formValue}
                  onChange={setFormValue}
                  groups={groups}
                />
              )}
              {showComp('1') && (
                <PatientSummary
                  summary={appointmentHistory}
                  fields={viewFields}
                />
              )}
              {showComp('2') && (
                <PatientProgress
                  history={appointmentHistory}
                  viewFields={viewFields}
                />
              )}
              {showComp('3') && <PatientLabs patient={patient} />}
              {showComp('4') && <History patient={patient} />}
            </Div>
          </Div>
        </Div>
      </Div>
      <PatientInfo patient={patient} />
      <Prescription
        visible={isPrescriptionVisible}
        patient={patient}
        onClose={() => setPrescriptionVisible(false)}
        content={prescriptionBody}
        clinicInfo={{}}
        onChange={val => {
          setFormValue(
            R.mergeDeepRight(formValue, { [prescriptionField.id]: val })
          );
        }}
      />
    </Div>
  );
}

export default Appointment;
