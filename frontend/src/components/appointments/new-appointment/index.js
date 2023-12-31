import { useCallback, useEffect, useState, useMemo } from 'react';
import * as moment from 'moment';
import * as R from 'ramda';
import { Alert, Form, Checkbox, Modal, Button, Toggle } from 'rsuite';
import { ACTIONS } from 'utils/constants';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'components/widgets/button/spinner';
import {
  CRSelectInput,
  CRTimePicker,
  CRDatePicker,
  H5,
  Div,
  NewPatient,
  CRBrancheTree,
  CRButton,
  CRLabel,
} from 'components';
import { isBeforeToday } from 'utils/date';

import { filterPatientBy } from 'utils/patient';
import {
  useAppointmentForm,
  useNewAppointment,
  useAppointments,
  useModal,
  useCourses,
  usePatients,
  useSessionDefinition,
  useConfigurations,
  useRoomDefinition,
} from 'hooks';

const initialValues = {
  type: 'Session',
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

const FormItemContainer = ({ children, className }) => (
  <div className={`w-full sm:w-1/2 p-2 ${className ?? ''}`}>{children}</div>
);

const NewAppointment = ({
  show: showModel,
  onHide,
  appointment,
  followUp,
  setFollowUp,
}) => {
  const { visible, open, close } = useModal();
  const [patientSearchValue, setPatientSearchValue] = useState('');
  const { t } = useTranslation();
  const { configurations } = useConfigurations();
  const enableSMS = R.propOr(false, 'enableSMS')(configurations);
  const { formValue, setFormValue, checkResult, validate, show, setShow } =
    useNewAppointment({
      onCreate: () => {
        onHide();
        setPatientSearchValue('');
      },
    });
  const { createAppointment, loading } = useNewAppointment({
    onCreate: () => {
      onHide();
      setPatientSearchValue('');
      setFormValue(initialValues);
      setShow(false);
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
  const { roomsDefinition } = useRoomDefinition({});
  const { appointmentsCount } = useAppointments({
    date: formValue?.date,
    userId: formValue?.userId,
    roomId: formValue?.roomId,
  });
  const { disabledMinutes, hideHours, sessionNotHaveEnoughTime } =
    useAppointmentForm({
      date: formValue.date,
      type: formValue.type,
      appointments: appointmentsCount?.appointments || [],
    });

  const updatedPatientCourses = patientCourses.map(course => ({
    name: course.name,
    IDBTransaction: course.id,
  }));
  const updatedSessionsDefinition = useMemo(() => {
    return sessionsDefinition.map(s => {
      return {
        name: s.name,
        id: s,
      };
    });
  }, [sessionsDefinition]);

  useEffect(() => {
    if (appointment && updatedSessionsDefinition.length > 0) {
      if (followUp) {
        setFormValue({
          branchId: appointment?.branch.id,
          type: appointment?.type,
          patientId: appointment?.patient.id,
          specialtyId: appointment?.specialty.id,
          userId: appointment?.doctor.id,
          session: appointment?.session,
          date: new Date(appointment?.session.timer),
        });
      } else {
        setFormValue({
          branchId: appointment?.branch.id,
          type: appointment?.type,
          patientId: appointment?.patient.id,
          specialtyId: appointment?.specialty.id,
          userId: appointment?.doctor.id,
          session: appointment?.session,
          date: new Date(),
        });
      }
    }
  }, [appointment, followUp, setFormValue, updatedSessionsDefinition]);

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
      referedDoctor,
      roomId,
    } = formValue;
    const timeDate = moment(formValue.time);

    let date = moment(formValue.date).set({
      hours: timeDate.hours(),
      minute: timeDate.minutes(),
    });
    if (sessionNotHaveEnoughTime(session, date)) {
      Alert.error('This Session do not have enough time');
      return;
    }
    if (waiting) {
      date = moment(formValue.date).set({
        hours: '13',
        minute: '00',
        second: '00',
      });
    }
    const sessionId = session?.id;
    const duration = session?.duration;
    const appointmentId = appointment?.id;
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
      sendSMS,
      appointmentId,
      followUp,
      referedDoctor,
      roomId,
    });
  }, [
    createAppointment,
    formValue,
    followUp,
    appointment,
    setShow,
    validate,
    sessionNotHaveEnoughTime,
  ]);
  return (
    <>
      <NewPatient
        onCreateDefault={({ id }) => {
          setFormValue({ ...formValue, patientId: id });
          close();
        }}
        show={visible}
        onHide={close}
      />
      <Modal
        show={showModel}
        className="!w-[calc(100vw-5%)] max-w-5xl"
        loading={loading}
        onHide={() => {
          onHide();
          setFormValue(initialValues);
          setFollowUp(false);
        }}
      >
        <Modal.Header className="text-[1rem]">
          {t('newAppointment')}
        </Modal.Header>
        <Modal.Body>
          <div className="bg-sky-100 p-2">
            <p>
              {t('totalAppointments')}:{' '}
              {appointmentsCount.totalAppointment ?? 0}
            </p>
            <p>
              {t('totalWaitingList')}: {appointmentsCount.totalWaiting ?? 0}
            </p>
          </div>
          <Form fluid formValue={formValue} onChange={setFormValue}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
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
                {roomsDefinition && roomsDefinition.length > 0 && (
                  <CRSelectInput
                    label="Room / Device Name"
                    name="roomId"
                    block
                    data={roomsDefinition}
                    valueKey="id"
                    labelKey="name"
                  />
                )}
                <CRBrancheTree
                  formValue={formValue}
                  v
                  onChange={setFormValue}
                  showUserAndOrganization={false}
                  NotAutoHideNested={false}
                  action={ACTIONS.Create_Appointment}
                />
              </div>
              <div>
                <CRSelectInput
                  label={t('patient')}
                  onSearch={v => {
                    if (v) {
                      setPatientSearchValue(v);
                    }
                  }}
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
                      {t('createNewPatient')}
                    </H5>
                  </Div>
                </CRSelectInput>
                <CRDatePicker
                  label={t('date')}
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
                    label={t('time')}
                    block
                    name="time"
                    disabledMinutes={minute =>
                      disabledMinutes(minute, moment(formValue.time).hours())
                    }
                    startHour={8}
                    onSelectTrigger
                  />
                )}
              </div>
            </div>
            <Div display="flex">
              <Div display="flex" ml="30px" mt="3px">
                <CRLabel>{t('addToWaitingList')}</CRLabel>
                <Toggle
                  onChange={val => setFormValue({ ...formValue, waiting: val })}
                  checked={formValue?.waiting}
                  style={{ margin: '5px' }}
                />
              </Div>
              <Div display="flex" ml="30px" mt="3px">
                <CRLabel>External</CRLabel>
                <Toggle
                  onChange={val =>
                    setFormValue({ ...formValue, referedDoctor: val })
                  }
                  checked={formValue?.referedDoctor}
                  style={{ margin: '5px' }}
                />
              </Div>
              {enableSMS && (
                <Checkbox
                  name="sendSMS"
                  value={true}
                  onChange={val => setFormValue({ ...formValue, sendSMS: val })}
                >
                  Send SMS
                </Checkbox>
              )}
            </Div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <CRButton
            onClick={handleCreate}
            appearance="primary"
            className="min-w-[5rem]"
          >
            {loading ? <Spinner /> : t('ok')}
          </CRButton>
          {/* <Button
            onClick={handleCreate}
            appearance="primary"
            className="min-w-[5rem]"
          >
            {t('ok')}
          </Button> */}
          <Button
            onClick={() => {
              onHide();
              setFormValue(initialValues);
            }}
            appearance="subtle"
          >
            {t('cancel')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

NewAppointment.propTypes = {};

NewAppointment.defaultProps = {};

export default NewAppointment;
