import React, { useState, useCallback, useEffect } from 'react';
import * as moment from 'moment';
import { Alert, Form, SelectPicker, DatePicker, Schema } from 'rsuite';

import {
  CRSelectInput,
  CRTimePicker,
  CRDatePicker,
  H5,
  Div,
  CRModal,
  NewPatient,
} from 'components';
import { isBeforeToday } from 'utils/date';
import { isValid } from 'services/form';
import { ModalBodyStyled, ContainerStyled } from './style';

import { filterPatientBy } from 'utils/patient';
import { getCreatableApptTypes } from 'services/appointment';
import useAppointmentForm from 'hooks/appointment-form';
import { mapArrWithIdsToChoices } from 'utils/misc';
import useNewAppointments from 'hooks/use-new-appointments';
import useModal from 'hooks/use-model';

const { StringType, DateType } = Schema.Types;

const appointmentTypes = getCreatableApptTypes().map(type => ({
  label: type,
  value: type,
}));

const model = Schema.Model({
  type: StringType().isRequired('Appointment Type is required'),
  patientId: StringType().isRequired('Patient Type is required'),
  userId: StringType().isRequired('Doctor Type is required'),
  date: DateType().isRequired('Day Type is required'),
  time: DateType().isRequired('Time Type is required'),
});

const initialValues = {
  type: 'Examination',
  patientId: '',
  branchId: null,
  specialtyId: null,
  userId: null,
  date: new Date(),
  time: null,
};
const canAddPatient = formValue =>
  formValue.type === 'Examination' ? true : false;

const searchBy = (text, _, patient) => {
  return filterPatientBy(text, patient);
};

export default function NewAppointment({ show, onHide }) {
  const { visible, open, close } = useModal();

  const {
    branches,
    specialties,
    doctors,
    formValue,
    setFormValue,
    createAppointment,
    appointments,
    patients,
  } = useNewAppointments({ onCreate: onHide });

  const [selectedHour, setSelectedHour] = useState(null);

  useEffect(() => {
    return () => {
      setFormValue(initialValues);
    };
  }, [setFormValue]);

  const { disabledMinutes, hideHours } = useAppointmentForm({
    date: formValue.date,
    type: formValue.type,
    selectedHour,
    appointments,
  });

  const handleCreate = useCallback(() => {
    if (!isValid(model, formValue)) {
      Alert.error('Complete Required Fields');
      return;
    }
    const { patientId, userId, type } = formValue;

    const timeDate = moment(formValue.time);
    const date = moment(formValue.date).set({
      hours: timeDate.hours(),
      minute: timeDate.minutes(),
    });
    createAppointment({ patientId, type, date, userId });
  }, [createAppointment, formValue]);

  return (
    <>
      <NewPatient
        onCreate={({ id }) => {
          setFormValue({ ...formValue, patient: id });
          close();
        }}
        show={visible}
        onHide={close}
      />
      <CRModal
        show={show}
        header="New Appointment"
        CRContainer={ContainerStyled}
        CRBody={ModalBodyStyled}
        onOk={handleCreate}
        onHide={() => {
          onHide();
          setFormValue(initialValues);
        }}
        onCancel={() => {
          onHide();
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
              name="patientId"
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
                  onClick={open}
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
            <CRSelectInput
              label="Branch"
              name="branchId"
              placeholder="Select Branch"
              block
              cleanable={false}
              searchable={false}
              accepter={SelectPicker}
              data={mapArrWithIdsToChoices(branches)}
            />
            {formValue.branchId && (
              <CRSelectInput
                label="Specialty"
                name="specialtyId"
                placeholder="Select Specialty"
                block
                cleanable={false}
                searchable={false}
                accepter={SelectPicker}
                data={mapArrWithIdsToChoices(specialties)}
              />
            )}
            {formValue.specialtyId && (
              <CRSelectInput
                label="Doctor"
                name="userId"
                placeholder="Select Doctor"
                block
                cleanable={false}
                searchable={false}
                accepter={SelectPicker}
                data={mapArrWithIdsToChoices(doctors)}
              />
            )}
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
