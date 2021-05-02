import React, { useState, useCallback, useEffect } from 'react';
import * as moment from 'moment';
import { Alert, Form, DatePicker, Schema } from 'rsuite';

import {
  CRSelectInput,
  CRTimePicker,
  CRDatePicker,
  Div,
  CRModal,
} from 'components';
import { isBeforeToday } from 'utils/date';
import { isValid } from 'services/form';
import { ModalBodyStyled, ContainerStyled } from './style';
import { getCreatableApptTypes } from 'services/appointment';
import { useAppointmentForm, useNewAppointment } from 'hooks';

const { StringType, DateType } = Schema.Types;

const appointmentTypes = getCreatableApptTypes().map(type => ({
  id: type,
  name: type,
}));

const model = Schema.Model({
  type: StringType().isRequired('Appointment Type is required'),
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

export default function NewAppointment({ show, onHide, patientid, userid }) {
  const {
    branches,
    specialties,
    doctors,
    formValue,
    setFormValue,
    createAppointment,
    appointments,
    patients,
    loading,
  } = useNewAppointment({ onCreate: onHide });

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
    const { type, branchId, specialtyId } = formValue;
    const patientId = patientid;
    const userId = userid;
    const timeDate = moment(formValue.time);
    const date = moment(formValue.date).set({
      hours: timeDate.hours(),
      minute: timeDate.minutes(),
    });
    createAppointment({
      patientId,
      type,
      date,
      userId,
    });
  }, [createAppointment, formValue, patientid, userid]);
  return (
    <>
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
              data={appointmentTypes}
            />
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
