import React, { useState, useCallback, useEffect, useMemo } from 'react';
import * as R from 'ramda';
import * as moment from 'moment';
import { Alert, Form, Checkbox, DatePicker, Schema } from 'rsuite';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from '@apollo/client';
import {
  CRSelectInput,
  CRTimePicker,
  CRDatePicker,
  H5,
  Div,
  CRModal,
  NewPatient,
} from 'components';
import { APPOINTMENTS_DAY_COUNT } from 'apollo-client/queries';
import { isBeforeToday } from 'utils/date';
import { isValid } from 'services/form';
import {
  ModalBodyStyled,
  ContainerStyled,
  Container,
  LeftContainer,
  RightContainer,
  SecondRowContainer,
} from './style';

import { filterPatientBy } from 'utils/patient';
import { getCreatableApptTypes } from 'services/appointment';
import {
  useAppointmentForm,
  useNewAppointment,
  useModal,
  useCourses,
} from 'hooks';

const { StringType, DateType } = Schema.Types;

const appointmentTypes = getCreatableApptTypes().map(type => ({
  id: type,
  name: type,
}));

const model = Schema.Model({
  type: StringType().isRequired('Appointment Type is required'),
  patientId: StringType().isRequired('Patient Type is required'),
  userId: StringType().isRequired('Doctor Type is required'),
  date: DateType().isRequired('Day Type is required'),
});

const initialValues = {
  type: 'Examination',
  patientId: '',
  courseId: null,
  branchId: null,
  specialtyId: null,
  userId: null,
  date: new Date(),
  time: null,
  waiting: false,
};
const canAddPatient = formValue =>
  formValue.type === 'Examination' ? true : false;

const searchBy = (text, _, patient) => {
  return filterPatientBy(text, patient);
};

const CustomizedNotification = ({ totalAppointment, totalWaiting }) => {
  return (
    <>
      <Div>Total Appointments: {totalAppointment} Patient</Div>
      <SecondRowContainer>
        <Div mr="50px">Total Waiting List: {totalWaiting} Patient</Div>
        <Div>View All</Div>
      </SecondRowContainer>
    </>
  );
};
const NewAppointment = ({ show, onHide }) => {
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
    loading,
  } = useNewAppointment({ onCreate: onHide });
  const { patientCourses } = useCourses({
    patientId: formValue.patientId,
  });
  const updatedPatientCourses = patientCourses.map(course => ({
    label: course.courseDefinition.name,
    value: course.id,
  }));
  const [selectedHour, setSelectedHour] = useState(null);
  const { data: appointmentsDay } = useQuery(APPOINTMENTS_DAY_COUNT, {
    variables: { date: moment(formValue.date).utc(true).toDate() },
    // pollInterval: 500,
  });
  const appointmentsCount = useMemo(
    () => R.propOr({}, 'appointmentsDayCount')(appointmentsDay),
    [appointmentsDay]
  );
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
    const { patientId, userId, type, courseId, waiting } = formValue;

    const timeDate = moment(formValue.time);

    let date = moment(formValue.date).set({
      hours: timeDate.hours(),
      minute: timeDate.minutes(),
    });
    if (waiting) {
      date = moment(formValue.date).set({
        hours: '24',
        minute: '00',
        second: '00',
      });
    }
    createAppointment({ patientId, type, date, userId, courseId, waiting });
  }, [createAppointment, formValue]);
  const notify = () => {
    toast(
      <CustomizedNotification
        totalAppointment={appointmentsCount.totalAppointment}
        totalWaiting={appointmentsCount.totalWaiting}
      />,
      {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: false,
        style: { backgroundColor: '#00b1cc', color: '#ffffff' },
      }
    );
  };
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
        loading={loading}
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
            <Container>
              <LeftContainer>
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
                    block
                    data={updatedPatientCourses}
                  />
                )}
                <CRDatePicker
                  label="Date"
                  block
                  name="date"
                  onOk={() => notify()}
                  accepter={DatePicker}
                  disabledDate={isBeforeToday}
                  placement="top"
                />
                {!formValue.waiting && (
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
                )}
              </LeftContainer>
              <RightContainer>
                <CRSelectInput
                  label="Patient"
                  name="patientId"
                  placeholder="Name / Phone no"
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
                  data={branches}
                />
                {formValue.branchId && (
                  <CRSelectInput
                    label="Specialty"
                    name="specialtyId"
                    placeholder="Select Specialty"
                    block
                    data={specialties}
                  />
                )}
                {formValue.specialtyId && (
                  <CRSelectInput
                    label="Doctor"
                    name="userId"
                    placeholder="Select Doctor"
                    block
                    data={doctors}
                  />
                )}
              </RightContainer>
            </Container>
            <Checkbox
              name="waiting"
              value={true}
              onChange={val => setFormValue({ ...formValue, waiting: val })}
            >
              {' '}
              Add to waiting list
            </Checkbox>
          </Form>
        </Div>
      </CRModal>
      <ToastContainer />
    </>
  );
};

NewAppointment.propTypes = {};

NewAppointment.defaultProps = {};

export default NewAppointment;
