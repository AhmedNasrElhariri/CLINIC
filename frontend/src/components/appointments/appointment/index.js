import React, { useState, useCallback, useEffect, useMemo } from 'react';
import * as R from 'ramda';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ButtonToolbar, Button, Icon, Alert } from 'rsuite';

import {
  GET_APPOINTMENT,
  UPDATE_APPOINTMENT,
  ARCHIVE_APPOINTMENT,
  GET_APPOINTMENT_HISTORY,
  GET_MY_CLINIC,
} from 'apollo-client/queries';

import PatientInfo from './patient-info';
import {
  Div,
  PatientProgress,
  PatientSummary,
  H3,
  CRNav,
  CRButton,
} from 'components';
import AppointmentData from './appointment-data';
import Prescription from './prescription';
import useGlobalState from 'state';

import {
  getFormInitValues,
  normalizeFieldsOfGroups,
  mapFormValueToAppointmentData,
  isArchived,
} from 'services/appointment';

const tabs = ['Home', 'Summary', 'Progress'];

function Appointment() {
  const [formValue, setFormValue] = useState({});
  const [view] = useGlobalState('activeView');
  const [disabled, setDisabled] = useState(false);
  const [isPrescriptionVisible, setPrescriptionVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('2');
  const { data: clinicInfo } = useQuery(GET_MY_CLINIC);
  let { appointmentId } = useParams();
  const { data: appointmentRes } = useQuery(GET_APPOINTMENT, {
    variables: {
      id: appointmentId,
    },
    fetchPolicy: 'no-cache',
    onCompleted: ({ appointment }) => {
      setFormValue(R.pick(['labs'])(appointment));
      setDisabled(isArchived(appointment));
    },
  });
  const { data: history } = useQuery(GET_APPOINTMENT_HISTORY, {
    variables: {
      id: appointmentId,
    },
  });
  const [update] = useMutation(UPDATE_APPOINTMENT, {
    onCompleted: () => {
      Alert.success('Appointment has been updates successfully');
    },
  });

  const groups = useMemo(() => R.propOr([], 'fieldGroups')(view), [view]);
  const viewFields = useMemo(
    () => R.pipe(R.map(R.prop('fields')), R.unnest)(groups),
    [groups]
  );
  const [archive] = useMutation(ARCHIVE_APPOINTMENT, {
    onCompleted: () => {
      Alert.success('Appointment has been Archived successfully');
      setDisabled(true);
    },
  });
  const appointment = useMemo(
    () => R.prop('appointment')(appointmentRes) || {},
    [appointmentRes]
  );
  const patient = useMemo(() => R.propOr({}, 'patient')(appointment), [
    appointment,
  ]);
  const appointmentHistory = useMemo(
    () => R.pathOr([], ['appointmentHistory'])(history),
    [history]
  );
  const data = useMemo(() => R.propOr([], 'data')(appointment), [appointment]);

  const normalizedFields = useMemo(
    () => normalizeFieldsOfGroups(groups, data),
    [data, groups]
  );
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
            <CRButton primary onClick={() => setPrescriptionVisible(true)}>
              Prescription
              <Icon icon="add" />
            </CRButton>
            <CRButton primary onClick={onUpdate} disabled={disabled}>
              Save <Icon icon="save" />
            </CRButton>
            <CRButton primary onClick={onArchive} disabled={disabled}>
              Archive <Icon icon="archive" />
            </CRButton>
            <Button color="red" appearance="link">
              Delete <Icon icon="trash-o" />
            </Button>
          </ButtonToolbar>
        </Div>
        <Div display="flex">
          <Div flexGrow={1}>
            <Div display="flex" justifyContent="space-between">
              <CRNav
                appearance="tabs"
                activeKey={activeTab}
                onSelect={setActiveTab}
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
              {showComp('1') && <PatientSummary summary={appointmentHistory} />}
              {showComp('2') && (
                <PatientProgress
                  history={appointmentHistory}
                  viewFields={viewFields}
                />
              )}
            </Div>
          </Div>
        </Div>
      </Div>
      <Div width={325} ml={64}>
        <PatientInfo patient={patient} />
      </Div>
      <Prescription
        visible={isPrescriptionVisible}
        patient={patient}
        onClose={() => setPrescriptionVisible(false)}
        content={prescriptionBody}
        clinicInfo={R.propOr({}, 'myClinic')(clinicInfo)}
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
