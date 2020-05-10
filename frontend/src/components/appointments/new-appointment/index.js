import React, { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { NewPatient } from 'components';
import {
  Alert,
  Form,
  Modal,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  SelectPicker,
  DatePicker,
  Schema,
  Panel,
} from 'rsuite';

import { FormStyled } from './style';
import { LIST_PATIENTS, CREATE_APPOINTMENT } from 'apollo-client/queries';

const { StringType } = Schema.Types;

const appointmentTypes = ['Examination', 'Followup'].map(t => ({
  label: t,
  value: t,
}));

const model = Schema.Model({
  type: StringType().isRequired('Appointment Type is required'),
  patient: StringType().isRequired('Patient Type is required'),
});

const initialValues = {
  type: 'Examination',
  patient: '',
  date: null,
};

const canAddPatient = formValue =>
  formValue.type === 'Examination' ? true : false;

function NewAppointment() {
  const [patientModal, setPatentModal] = useState(false);
  const [formValue, setFormValue] = useState(initialValues);

  const { data } = useQuery(LIST_PATIENTS);
  const [createAppointment] = useMutation(CREATE_APPOINTMENT, {
    onCompleted: () => {
      setFormValue(initialValues);
      Alert.success('Reservation Created Successfully');
    },
    onError: () => Alert.error('Invalid Input'),
  });

  const showModal = useCallback(() => setPatentModal(true), []);
  const hideModal = useCallback(() => setPatentModal(false), []);

  const patients = (data && data.patients) || [];

  return (
    <>
      <Modal show={patientModal} onHide={hideModal} size="xs">
        <Modal.Header>
          <Modal.Title>New Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewPatient onCreate={hideModal} />
        </Modal.Body>
      </Modal>
      <FormStyled>
        <Panel bordered>
          <Form
            fluid
            model={model}
            formValue={formValue}
            onChange={value => setFormValue(value)}
          >
            <FormGroup>
              <ControlLabel>Examination/Followup</ControlLabel>
              <FormControl
                name="type"
                accepter={SelectPicker}
                defaultValue={0}
                block
                cleanable={false}
                searchable={false}
                data={appointmentTypes}
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Patient</ControlLabel>
              <FormControl
                block
                name="patient"
                accepter={SelectPicker}
                cleanable={false}
                labelKey="name"
                valueKey="id"
                data={patients}
              />
              <Button
                appearance="link"
                onClick={showModal}
                disabled={!canAddPatient(formValue)}
              >
                New Patient
              </Button>
            </FormGroup>

            <FormGroup>
              <ControlLabel>Date</ControlLabel>
              <FormControl
                block
                name="date"
                format="DD-MM-YYYY"
                accepter={DatePicker}
              />
            </FormGroup>

            <Button
              appearance="primary"
              block
              onClick={() =>
                createAppointment({ variables: { input: formValue } })
              }
            >
              Create
            </Button>
          </Form>
        </Panel>
      </FormStyled>
    </>
  );
}

export default NewAppointment;
