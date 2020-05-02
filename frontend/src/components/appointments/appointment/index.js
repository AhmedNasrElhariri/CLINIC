import React, { useState, useCallback } from 'react';
import * as R from 'ramda';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Nav, ButtonToolbar, Button, Icon } from 'rsuite';

import {
  GET_APPOINTMENT,
  UPDATE_APPOINTMENT,
  ARCHIVE_APPOINTMENT,
  GET_APPOINTMENT_HISTORY,
} from 'apollo-client/queries';

import PatientInfo from './patient-info';
import { H5, Div, PatientProgress, PatientHistory } from 'components';
import AppointmentInput from './appointment-input';
import navs from './navs.metadata';

const tabs = ['Home', 'History', 'Progress'];

const initialValue = navs.reduce(
  (acc, { name, defaultValue }) => ({
    ...acc,
    [name]: defaultValue || '',
  }),
  {}
);

function Appointment() {
  const [formValue, setFormValue] = useState(initialValue);
  const [disabled, setDisabled] = useState(false);
  const [activeTab, setActiveTab] = useState('0');
  let { appointmentId } = useParams();

  const { data } = useQuery(GET_APPOINTMENT, {
    variables: {
      id: appointmentId,
    },
    onCompleted: ({ appointment }) => {
      setFormValue(
        R.pick([
          'vitalData',
          'labs',
          'complain',
          'signs',
          'diagnosis',
          'treatment',
          'recommendations',
        ])(appointment)
      );
      setDisabled(appointment.archived);
    },
  });

  const { data: history } = useQuery(GET_APPOINTMENT_HISTORY, {
    variables: {
      id: appointmentId,
    },
  });

  const [update] = useMutation(UPDATE_APPOINTMENT);
  const [archive] = useMutation(ARCHIVE_APPOINTMENT, {
    onCompleted: () => setDisabled(true),
  });
  const appointment = R.prop('appointment')(data) || {};
  const patient = R.propOr({}, 'patient')(appointment);
  const appointmentHistory = R.pathOr([], ['appointmentHistory'])(history);

  const showComp = useCallback(idx => activeTab === idx, [activeTab]);
  const onUpdate = useCallback(() => {
    update({
      variables: { appointment: formValue, id: appointmentId },
    });
  }, [formValue, update, appointmentId]);

  const onArchive = useCallback(() => {
    archive({
      variables: { id: appointmentId },
    });
  }, [archive, appointmentId]);

  return (
    <>
      <H5 mb={2}>Reservation</H5>
      <Div display="flex">
        <Div flexGrow={1}>
          <Div display="flex" justifyContent="space-between">
            <Nav
              appearance="tabs"
              activeKey={activeTab}
              onSelect={setActiveTab}
            >
              {tabs.map((t, idx) => (
                <Nav.Item eventKey={idx + ''} key={idx}>
                  {t}
                </Nav.Item>
              ))}
            </Nav>
            <ButtonToolbar>
              <Button color="blue" onClick={onUpdate} disabled={disabled}>
                Save <Icon icon="save" />
              </Button>
              <Button
                color="violet"
                appearance="ghost"
                onClick={onArchive}
                disabled={disabled}
              >
                Archive <Icon icon="archive" />
              </Button>
              <Button color="red" appearance="link">
                Delete <Icon icon="trash-o" />
              </Button>
            </ButtonToolbar>
          </Div>
          <Div py={3}>
            {showComp('0') && (
              <AppointmentInput
                disabled={disabled}
                formValue={formValue}
                onChange={setFormValue}
              />
            )}
            {showComp('1') && <PatientHistory history={appointmentHistory} />}
            {showComp('2') && <PatientProgress history={appointmentHistory} />}
          </Div>
        </Div>
        <Div width="320px">
          <PatientInfo patient={patient} />
        </Div>
      </Div>
    </>
  );
}

export default Appointment;
