import React, { useState, useCallback, useMemo } from 'react';
import * as moment from 'moment';
import { useMutation } from '@apollo/client';
import { Alert, Form, SelectPicker, DatePicker, Schema } from 'rsuite';

import {
  CRSelectInput,
  CRTimePicker,
  CRDatePicker,
  Div,
  H5,
  CRModal,
  NewPatient,
} from 'components';
import { CREATE_APPOINTMENT } from 'apollo-client/queries';
import { isBeforeToday } from 'utils/date';
import { isValid } from 'services/form';
import Fab from './fab';
import { ModalBodyStyled, ContainerStyled } from './style';
import useGlobalState from 'state';
import { sortAppointmentsByDate, isUrgent } from 'services/appointment';

import useFetchData from './fetch-data';
import { filterPatientBy } from 'utils/patient';
import { APPT_TYPE } from 'utils/constants';

const { StringType } = Schema.Types;

const appointmentTypes = Object.entries(APPT_TYPE).map(([label, value]) => ({
  label,
  value,
}));

const model = Schema.Model({
  type: StringType().isRequired('Appointment Type is required'),
  patient: StringType().isRequired('Patient Type is required'),
});

const initialValues = {
  type: 'Examination',
  patient: '',
  date: new Date(),
  time: null,
};

const canAddPatient = formValue =>
  formValue.type === 'Examination' ? true : false;

const searchBy = (text, _, patient) => {
  return filterPatientBy(text, patient);
};

export default function NewAppointment() {
  const [patientModal, setPatientModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState(initialValues);
  const [selectedHour, setSelectedHour] = useState(null);
  const [currentClinic] = useGlobalState('currentClinic');
  const { patients, appointments, updateAppointments } = useFetchData();

  const [createAppointment] = useMutation(CREATE_APPOINTMENT, {
    onCompleted: ({ createAppointment }) => {
      setFormValue(initialValues);
      Alert.success('Reservation Created Successfully');
      updateAppointments(
        sortAppointmentsByDate([createAppointment, ...appointments])
      );
    },
    onError: ({ message }) => Alert.error(message),
  });

  const showModal = useCallback(() => setPatientModal(true), []);
  const hideModal = useCallback(() => setPatientModal(false), []);

  const selectedDayAppointments = useMemo(
    () =>
      appointments.filter(({ date }) =>
        moment(date).isSame(formValue.date, 'day')
      ),
    [appointments, formValue.date]
  );

  const handleCreate = useCallback(() => {
    if (!isValid(model, formValue)) {
      Alert.error('Complete Required Fields');
      return;
    }
    const { patient, type } = formValue;

    const timeDate = moment(formValue.time);
    const date = moment(formValue.date).set({
      hours: timeDate.hours(),
      minute: timeDate.minutes(),
    });
    createAppointment({
      variables: { input: { patient, type, clinicId: currentClinic.id, date } },
    });
  }, [createAppointment, currentClinic.id, formValue]);

  const disabledMinutes = useCallback(
    minute => {
      if (isUrgent(formValue)) {
        return false;
      }
      const selectedDate = formValue.date;

      const newDate = moment(selectedDate).set({
        hours: selectedHour,
        minute: minute,
      });

      const isBeforeNow = newDate.isBefore(moment(), 'minute');
      if (isBeforeNow) {
        return true;
      }

      return selectedDayAppointments.some(({ date }) => {
        const startDate = moment(date);
        const endDate = moment(startDate).add(5, 'minutes');
        return newDate.isBetween(startDate, endDate, 'minutes', '[)');
      });
    },
    [formValue, selectedDayAppointments, selectedHour]
  );

  const hideHours = useCallback(
    hours => {
      const hourDate = moment(formValue.date).set({
        hours,
      });
      if (hourDate.isBefore(moment(), 'hours')) {
        return true;
      }
      if (isUrgent(formValue)) {
        return false;
      }
      return (
        selectedDayAppointments.filter(app =>
          moment(app.date).isSame(hourDate, 'hours')
        ).length >= 4
      );
    },
    [formValue, selectedDayAppointments]
  );

  return (
    <>
      <NewPatient
        onCreate={({ id }) => {
          setFormValue({ ...formValue, patient: id });
          hideModal();
        }}
        show={patientModal}
        onHide={hideModal}
      />
      <Div position="fixed" right={64} bottom={64} zIndex={99999}>
        <Fab open={open} setOpen={setOpen} />
      </Div>
      <CRModal
        show={open}
        header="New Appointment"
        CRContainer={ContainerStyled}
        CRBody={ModalBodyStyled}
        onOk={handleCreate}
        onHide={() => {
          setOpen(false);
          setFormValue(initialValues);
        }}
        onCancel={() => {
          setOpen(false);
          setFormValue(initialValues);
        }}
      >
        <Div>
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
              placeholder="Name / Phone no"
              accepter={SelectPicker}
              cleanable={true}
              labelKey="name"
              valueKey="id"
              data={patients}
              searchBy={searchBy}
              virtualized={false}
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
              placement="top"
            />

            <CRTimePicker
              label="Time"
              block
              name="time"
              accepter={DatePicker}
              placement="top"
              disabledMinutes={disabledMinutes}
              hideHours={hideHours}
              startHour={8}
              onSelect={a => setSelectedHour(moment(a).hour())}
            />
          </Form>
        </Div>
      </CRModal>
    </>
  );
}

NewAppointment.propTypes = {};

NewAppointment.defaultProps = {};
