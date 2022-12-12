import React, { useCallback, useEffect } from 'react';
import * as moment from 'moment';
import { Alert, Form,  Schema } from 'rsuite';

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
import { useAppointmentForm, useNewAppointment, useCourses } from 'hooks';

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
  Session: 'Session',
  patientId: '',
  branchId: null,
  specialtyId: null,
  courseId: null,
  userId: null,
  date: new Date(),
  time: null,
};

export default function NewAppointment({ show, onHide, appointment }) {
  const { formValue, setFormValue, createAppointment, appointments } =
    useNewAppointment({ onCreate: onHide });
  const { patient, branch, specialty, userId } = appointment;
  const { patientCourses } = useCourses({
    patientId: patient?.id,
  });
  const updatedPatientCourses = patientCourses.map(course => ({
    name: course?.name,
    IDBTransaction: course.id,
  }));
  // useEffect(() => {
  //   return () => {
  //     setFormValue(initialValues);
  //   };
  // }, [setFormValue]);
  
  const { disabledMinutes, hideHours } = useAppointmentForm({
    date: formValue.date,
    type: formValue.type,
    appointments,
  });
  const handleCreate = useCallback(() => {
    if (!isValid(model, formValue)) {
      Alert.error('Complete Required Fields');
      return;
    }
    const { type, courseId } = formValue;
    const patientId = patient.id;
    const branchId = branch.id;
    const specialtyId = specialty.id;
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
      branchId,
      specialtyId,
      courseId,
    });
  }, [createAppointment, formValue, appointment, userId]);
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
            {formValue.type === 'Course' && (
              <CRSelectInput
                label="Course"
                name="courseId"
                valueKey="IDBTransaction"
                block
                data={updatedPatientCourses}
              />
            )}
            <CRDatePicker
              label="Date"
              block
              name="date"
              disabledDate={isBeforeToday}
            />
            <CRTimePicker
              label="Time"
              block
              name="time"
              disabledMinutes={minute =>
                disabledMinutes(minute, moment(formValue.time).hours())
              }
              onSelectTrigger
              hideHours={hideHours}
              startHour={8}
            />
          </Form>
        </Div>
      </CRModal>
    </>
  );
}

NewAppointment.propTypes = {};

NewAppointment.defaultProps = {};
