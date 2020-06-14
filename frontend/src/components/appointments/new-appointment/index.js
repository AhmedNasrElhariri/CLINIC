import React, { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import { Alert, Form, Modal, SelectPicker, DatePicker, Schema } from 'rsuite';

import {
  CRSelectInput,
  CRDatePicker,
  CRTimePicker,
  CRButton,
  Div,
  H5,
} from 'components';
import { LIST_PATIENTS, CREATE_APPOINTMENT } from 'apollo-client/queries';
import { isBeforeToday } from 'utils/date';
import Fab from './fab';
import NewPatient from './new-patient';

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
  time: null,
};

const NewAppointmentModal = styled(Modal)`
  position: fixed;
  right: 140px;
  bottom: 170px;
  width: 447px;

  & .rs-modal-content {
    box-shadow: -6px 6px 20px 0 rgba(0, 0, 0, 0.05);
    border: solid 1px rgba(40, 49, 72, 0.1);
    border-radius: 17px;
    padding: 0;
  }
`;

const ModalBodyStyled = styled(Modal.Body)`
  padding: 36px;
  margin-top: 0px;
`;

const canAddPatient = formValue =>
  formValue.type === 'Examination' ? true : false;

export default function NewAppointment() {
  const [patientModal, setPatientModal] = useState(false);
  const [open, setOpen] = useState(true);
  const [formValue, setFormValue] = useState(initialValues);

  const { data } = useQuery(LIST_PATIENTS);
  const [createAppointment] = useMutation(CREATE_APPOINTMENT, {
    onCompleted: () => {
      setFormValue(initialValues);
      Alert.success('Reservation Created Successfully');
    },
    onError: () => Alert.error('Invalid Input'),
  });

  const showModal = useCallback(() => setPatientModal(true), []);
  const hideModal = useCallback(() => setPatientModal(false), []);

  const patients = (data && data.patients) || [];

  return (
    <>
      <NewPatient open={patientModal} onHide={hideModal} />
      <Div position="absolute" right={140} bottom={64}>
        <Fab open={open} setOpen={setOpen} />
      </Div>
      <NewAppointmentModal show={open}>
        <ModalBodyStyled>
          <Form
            fluid
            model={model}
            formValue={formValue}
            onChange={setFormValue}
          >
            <CRSelectInput
              label="Examination/Followup"
              name="type"
              block
              cleanable={false}
              searchable={false}
              data={appointmentTypes}
            />

            <CRSelectInput
              label="Patient"
              name="patient"
              accepter={SelectPicker}
              cleanable={true}
              labelKey="name"
              valueKey="id"
              data={patients}
              block
            >
              <Div display="flex" justifyContent="flex-end">
                <H5
                  onClick={showModal}
                  disabled={!canAddPatient(formValue)}
                  variant="primary"
                  fontWeight={600}
                  className="cursor-pointer"
                  mt={2}
                >
                  Create New Patient
                </H5>
              </Div>
            </CRSelectInput>

            <CRDatePicker
              label="Date"
              block
              name="date"
              accepter={DatePicker}
              disabledDate={isBeforeToday}
            />

            <CRTimePicker
              label="Time"
              block
              name="time"
              accepter={DatePicker}
              disabledDate={isBeforeToday}
              placement="top"
            />

            <CRButton
              block
              bold
              uppercase
              onClick={() =>
                createAppointment({ variables: { input: formValue } })
              }
            >
              Create
            </CRButton>
          </Form>
        </ModalBodyStyled>
      </NewAppointmentModal>
    </>
  );
}
