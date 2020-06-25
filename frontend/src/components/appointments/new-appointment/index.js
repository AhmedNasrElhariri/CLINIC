import React, { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Alert, Form, SelectPicker, DatePicker, Schema } from 'rsuite';

import {
  CRSelectInput,
  CRDatePicker,
  CRTimePicker,
  Div,
  H5,
  CRModal,
  NewPatient,
} from 'components';
import { LIST_PATIENTS, CREATE_APPOINTMENT } from 'apollo-client/queries';
import { isBeforeToday } from 'utils/date';
import Fab from './fab';
import { ModalBodyStyled, ContainerStyled } from './style';

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
  // time: null,
};

const canAddPatient = formValue =>
  formValue.type === 'Examination' ? true : false;

export default function NewAppointment() {
  const [patientModal, setPatientModal] = useState(false);
  const [open, setOpen] = useState(false);
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
      <NewPatient onCreate={hideModal} show={patientModal} onHide={hideModal} />
      <Div position="fixed" right={64} bottom={64} zIndex={99999}>
        <Fab open={open} setOpen={setOpen} />
      </Div>
      <CRModal
        show={open}
        header="New Appointment"
        CRContainer={ContainerStyled}
        CRBody={ModalBodyStyled}
        onOk={() => createAppointment({ variables: { input: formValue } })}
        onHide={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <Form fluid model={model} formValue={formValue} onChange={setFormValue}>
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

          {/* <CRButton
            block
            bold
            uppercase
            onClick={() =>
              createAppointment({ variables: { input: formValue } })
            }
          >
            Create
          </CRButton> */}
        </Form>
      </CRModal>
    </>
  );
}

NewAppointment.propTypes = {};

NewAppointment.defaultProps = {};
