import React, { useCallback, useEffect, useState, useMemo } from 'react';
import * as moment from 'moment';
import * as R from 'ramda';
import { Alert, Form, Checkbox } from 'rsuite';
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
import { isBeforeToday } from 'utils/date';
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
  useConfigurations,
} from 'hooks';

const appointmentTypes = getCreatableApptTypes().map(type => ({
  id: type,
  name: type,
}));

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
  sendSMS: false,
};
const canAddPatient = formValue =>
  formValue.type === 'Examination' ? true : false;

const searchBy = (text, _, patient) => {
  return filterPatientBy(text, patient);
};

const NewAppointment = ({ show: showModel, onHide, appointment }) => {
  const { visible, open, close } = useModal();
  const [patientSearchValue, setPatientSearchValue] = useState('');
  const { configurations } = useConfigurations();
  const enableSMS = R.propOr(false, 'enableSMS')(configurations);
  const {
    formValue,
    setFormValue,
    checkResult,
    validate,
    show,
    setShow,
    createAppointment,
    loading,
  } = useNewAppointment({
    onCreate: () => {
      onHide();
      setPatientSearchValue('');
    },
  });
  const { searchedPatients } = usePatients({
    patientSearchValue: patientSearchValue,
  });
  const returnedPatientsOfSearch = useMemo(() => {
    return searchedPatients;
  }, [searchedPatients]);
  const { patientCourses } = useCourses({
    patientId: formValue.patientId,
  });
  const { sessionsDefinition } = useSessionDefinition();
  const { appointmentsCount } = useAppointments({
    date: formValue?.date,
    userId: formValue?.userId,
  });
  const { disabledMinutes, hideHours } = useAppointmentForm({
    date: formValue.date,
    type: formValue.type,
    appointments: appointmentsCount?.appointments || [],
  });

  const updatedPatientCourses = patientCourses.map(course => ({
    name: course.name,
    IDBTransaction: course.id,
  }));
  const updatedSessionsDefinition = sessionsDefinition.map(s => {
    return {
      name: s.name,
      id: s,
    };
  });

  useEffect(() => {
    if (appointment && appointment?.branch?.id != null) {
      setFormValue({
        branchId: appointment.branch.id,
        type: appointment.type,
        patientId: appointment.patient.id,
        specialtyId: appointment.specialty.id,
        userId: appointment.doctor.id,
        date: new Date(),
      });
    }
  }, [appointment]);
  const handleCreate = useCallback(() => {
    setShow(true);
    if (!validate) {
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
      sendSMS,
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
      sendSMS
    });
  }, [createAppointment, formValue]);
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
        show={showModel}
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
        show={showModel}
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
          <Form fluid formValue={formValue} onChange={setFormValue}>
            <Container>
              <LeftContainer>
                <CRSelectInput
                  label="Examination/Followup"
                  name="type"
                  errorMessage={
                    show && checkResult['type']?.hasError
                      ? checkResult['type']?.errorMessage
                      : ''
                  }
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
                  data={returnedPatientsOfSearch}
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
                  errorMessage={
                    show && checkResult['date']?.hasError
                      ? checkResult['date']?.errorMessage
                      : ''
                  }
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
            <Div display="flex" >
            <Checkbox
              name="waiting"
              value={true}
              onChange={val => setFormValue({ ...formValue, waiting: val })}
            >
              {' '}
              Add to waiting list
            </Checkbox>
            {enableSMS && (
              <Checkbox
                name="sendSMS"
                value={true}
                onChange={val => setFormValue({ ...formValue, sendSMS: val })}
              >
                {' '}
                Send SMS
              </Checkbox>
            )}
            </Div>
          </Form>
        </Div>
      </CRModal>
    </>
  );
};

NewAppointment.propTypes = {};

NewAppointment.defaultProps = {};

export default NewAppointment;
