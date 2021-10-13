import React, { useCallback, useEffect, useState } from 'react';
import * as moment from 'moment';
import { Alert, Form, Checkbox, Schema } from 'rsuite';
import { ACTIONS } from 'utils/constants';
import {
  CRSelectInput,
  CRTimePicker,
  CRDatePicker,
  H5,
  Div,
  CRModal,
  NewPatient,
  CRBrancheTree,
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
  SecondContainerStyled,
  SecondModalBodyStyled,
} from './style';

import { filterPatientBy } from 'utils/patient';
import { getCreatableApptTypes } from 'services/appointment';
import {
  useAppointmentForm,
  useNewAppointment,
  useAppointments,
  useModal,
  useCourses,
  usePatients,
  useSessionDefinition,
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

const NewAppointment = ({ show, onHide }) => {
  const { visible, open, close } = useModal();
  const [patientSearchValue, setPatientSearchValue] = useState('');
  const {
    branches,
    formValue,
    setFormValue,
    createAppointment,
    patients,
    loading,
  } = useNewAppointment({
    onCreate: onHide,
  });
  const { searchedPatients } = usePatients({
    patientSearchValue: patientSearchValue,
  });
  const { patientCourses } = useCourses({
    patientId: formValue.patientId,
  });
  const updatedPatientCourses = patientCourses.map(course => ({
    name: course.courseDefinition.name,
    IDBTransaction: course.id,
  }));
  const { sessionsDefinition } = useSessionDefinition();
  const updatedSessionsDefinition = sessionsDefinition.map(s => {
    return {
      name: s.name,
      id: s,
    };
  });
  const { appointmentsCount } = useAppointments({
    date: formValue?.date,
    userId: formValue?.userId,
  });
  useEffect(() => {
    return () => {
      setFormValue(initialValues);
    };
  }, [setFormValue]);
  const { disabledMinutes, hideHours } = useAppointmentForm({
    date: formValue.date,
    type: formValue.type,
    appointments: appointmentsCount?.appointments || [],
  });
  const handleCreate = useCallback(() => {
    if (!isValid(model, formValue)) {
      Alert.error('Complete Required Fields');
      return;
    }
    const {
      patientId,
      userId,
      type,
      courseId,
      branchId,
      specialtyId,
      waiting,
      session,
    } = formValue;

    const timeDate = moment(formValue.time);

    let date = moment(formValue.date).set({
      hours: timeDate.hours(),
      minute: timeDate.minutes(),
    });

    if (waiting) {
      date = moment(formValue.date).set({
        hours: '13',
        minute: '00',
        second: '00',
      });
    }
    const sessionId = session?.id;
    const duration = session?.duration;
    createAppointment({
      patientId,
      type,
      date,
      userId,
      courseId,
      branchId,
      specialtyId,
      waiting,
      sessionId,
      duration,
    });
  }, [createAppointment, formValue]);
  // const notify = () => {
  //   toast(
  //     <CustomizedNotification
  //       totalAppointment={appointmentsCount.totalAppointment}
  //       totalWaiting={appointmentsCount.totalWaiting}
  //     />,
  //     {
  //       position: toast.POSITION.BOTTOM_RIGHT,
  //       autoClose: 5000,
  //       style: { backgroundColor: '#00b1cc', color: '#ffffff' },
  //     }
  //   );
  // };
  return (
    <>
      <NewPatient
        onCreate={({ id }) => {
          setFormValue({ ...formValue, patientId: id });
          close();
        }}
        show={visible}
        onHide={close}
      />
      <CRModal
        show={show}
        CRContainer={SecondContainerStyled}
        CRBody={SecondModalBodyStyled}
        noFooter
        noHeader
        loading={loading}
        onHide={() => {
          onHide();
        }}
        onCancel={() => {
          onHide();
        }}
      >
        <Div>
          Total Appointments: {appointmentsCount?.totalAppointment} Patient
        </Div>
        <SecondRowContainer>
          <Div>
            Total Waiting List: {appointmentsCount?.totalWaiting} Patient
          </Div>
          <Div>View All</Div>
        </SecondRowContainer>
      </CRModal>
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
                    valueKey="IDBTransaction"
                    block
                    data={updatedPatientCourses}
                  />
                )}
                {formValue.type === 'Session' && (
                  <CRSelectInput
                    label="Session Name"
                    name="session"
                    block
                    data={updatedSessionsDefinition}
                  />
                )}
                <CRBrancheTree
                  formValue={formValue}
                  onChange={setFormValue}
                  showUserAndOrganization={false}
                  NotAutoHideNested={false}
                  action={ACTIONS.Create_Appointment}
                />
              </LeftContainer>
              <RightContainer>
                <CRSelectInput
                  label="Patient"
                  onSearch={v => setPatientSearchValue(v)}
                  placeholder="Name / Phone no"
                  data={searchedPatients}
                  onChange={val =>
                    setFormValue({ ...formValue, patientId: val })
                  }
                  value={formValue.patientId}
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
                <CRDatePicker
                  label="Date"
                  block
                  name="date"
                  disabledDate={isBeforeToday}
                />
                {!formValue.waiting && formValue?.userId && (
                  <CRTimePicker
                    label="Time"
                    block
                    name="time"
                    disabledMinutes={minute =>
                      disabledMinutes(minute, moment(formValue.time).hours())
                    }
                    hideHours={hideHours}
                    startHour={8}
                    onSelectTrigger
                  />
                )}{' '}
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
    </>
  );
};

NewAppointment.propTypes = {};

NewAppointment.defaultProps = {};

export default NewAppointment;
