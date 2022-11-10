// import React, { useCallback, useEffect, useState, useMemo } from 'react';
// import * as moment from 'moment';
// import * as R from 'ramda';
// import { Alert, Form, Checkbox } from 'rsuite';
// import { ACTIONS } from 'utils/constants';
// import { useTranslation } from 'react-i18next';
// import {
//   CRSelectInput,
//   CRTimePicker,
//   CRDatePicker,
//   H5,
//   Div,
//   CRModal,
//   NewPatient,
//   CRBrancheTree,
// } from 'components';
// import { isBeforeToday } from 'utils/date';
// import {
//   ModalBodyStyled,
//   ContainerStyled,
//   Container,
//   LeftContainer,
//   RightContainer,
//   SecondRowContainer,
//   SecondContainerStyled,
//   SecondModalBodyStyled,
// } from './style';

// import { filterPatientBy } from 'utils/patient';
// import { getCreatableApptTypes } from 'services/appointment';
// import {
//   useAppointmentForm,
//   useNewAppointment,
//   useAppointments,
//   useModal,
//   useCourses,
//   usePatients,
//   useSessionDefinition,
//   useConfigurations,
// } from 'hooks';

// const appointmentTypes = getCreatableApptTypes().map(type => ({
//   id: type,
//   name: type,
// }));

// const initialValues = {
//   type: 'Session',
//   patientId: '',
//   courseId: null,
//   branchId: null,
//   specialtyId: null,
//   userId: null,
//   date: new Date(),
//   time: null,
//   waiting: false,
//   sendSMS: false,
// };
// const canAddPatient = formValue =>
//   formValue.type === 'Examination' ? true : false;

// const searchBy = (text, _, patient) => {
//   return filterPatientBy(text, patient);
// };

// const NewAppointment = ({ show: showModel, onHide, appointment }) => {
//   const { visible, open, close } = useModal();
//   const [patientSearchValue, setPatientSearchValue] = useState('');
//   const { t } = useTranslation();
//   const { configurations } = useConfigurations();
//   const enableSMS = R.propOr(false, 'enableSMS')(configurations);
//   const {
//     formValue,
//     setFormValue,
//     checkResult,
//     validate,
//     show,
//     setShow,
//     createAppointment,
//     loading,
//   } = useNewAppointment({
//     onCreate: () => {
//       onHide();
//       setPatientSearchValue('');
//     },
//   });
//   const { searchedPatients } = usePatients({
//     patientSearchValue: patientSearchValue,
//   });
//   const returnedPatientsOfSearch = useMemo(() => {
//     return searchedPatients;
//   }, [searchedPatients]);
//   const { patientCourses } = useCourses({
//     patientId: formValue.patientId,
//   });
//   const { sessionsDefinition } = useSessionDefinition();
//   const { appointmentsCount } = useAppointments({
//     date: formValue?.date,
//     userId: formValue?.userId,
//   });
//   const { disabledMinutes, hideHours } = useAppointmentForm({
//     date: formValue.date,
//     type: formValue.type,
//     appointments: appointmentsCount?.appointments || [],
//   });

//   const updatedPatientCourses = patientCourses.map(course => ({
//     name: course.name,
//     IDBTransaction: course.id,
//   }));
//   const updatedSessionsDefinition = sessionsDefinition.map(s => {
//     return {
//       name: s.name,
//       id: s,
//     };
//   });

//   useEffect(() => {
//     if (appointment && appointment?.branch?.id != null) {
//       setFormValue({
//         branchId: appointment.branch.id,
//         type: appointment.type,
//         patientId: appointment.patient.id,
//         specialtyId: appointment.specialty.id,
//         userId: appointment.doctor.id,
//         date: new Date(),
//       });
//     }
//   }, [appointment]);
//   const handleCreate = useCallback(() => {
//     setShow(true);
//     if (!validate) {
//       Alert.error('Complete Required Fields');
//       return;
//     }
//     const {
//       patientId,
//       userId,
//       type,
//       courseId,
//       branchId,
//       specialtyId,
//       waiting,
//       session,
//       sendSMS,
//     } = formValue;

//     const timeDate = moment(formValue.time);

//     let date = moment(formValue.date).set({
//       hours: timeDate.hours(),
//       minute: timeDate.minutes(),
//     });

//     if (waiting) {
//       date = moment(formValue.date).set({
//         hours: '13',
//         minute: '00',
//         second: '00',
//       });
//     }
//     const sessionId = session?.id;
//     const duration = session?.duration;
//     createAppointment({
//       patientId,
//       type,
//       date,
//       userId,
//       courseId,
//       branchId,
//       specialtyId,
//       waiting,
//       sessionId,
//       duration,
//       sendSMS,
//     });
//   }, [createAppointment, formValue]);
//   return (
//     <>
//       <NewPatient
//         onCreate={({ id }) => {
//           setFormValue({ ...formValue, patientId: id });
//           close();
//         }}
//         show={visible}
//         onHide={close}
//       />
//       <CRModal
//         show={showModel}
//         CRContainer={SecondContainerStyled}
//         CRBody={SecondModalBodyStyled}
//         noFooter
//         noHeader
//         loading={loading}
//         onHide={() => {
//           onHide();
//         }}
//         onCancel={() => {
//           onHide();
//         }}
//       >
//         <Div>
//           {t('totalAppointments')}: {appointmentsCount?.totalAppointment}{' '}
//           {/* {t('patient')} */}
//         </Div>
//         <SecondRowContainer>
//           <Div>
//             {t('totalWaitingList')}: {appointmentsCount?.totalWaiting}{' '}
//             {/* {t(t('patient'))} */}
//           </Div>
//           <Div>{t('viewAll')}</Div>
//         </SecondRowContainer>
//       </CRModal>
//       <CRModal
//         show={showModel}
//         header={t('newAppointment')}
//         CRContainer={ContainerStyled}
//         CRBody={ModalBodyStyled}
//         onOk={handleCreate}
//         okTitle={t('ok')}
//         cancelTitle={t('cancel')}
//         loading={loading}
//         onHide={() => {
//           onHide();
//           setFormValue(initialValues);
//         }}
//         onCancel={() => {
//           onHide();
//           setFormValue(initialValues);
//         }}
//       >
//         <Div>

//         </Div>
//       </CRModal>
//     </>
//   );
// };

// NewAppointment.propTypes = {};

// NewAppointment.defaultProps = {};

// export default NewAppointment;

import React, { useCallback, useEffect, useState, useMemo } from 'react';
import * as moment from 'moment';
import * as R from 'ramda';
import { Alert, Form, Checkbox, Modal, Button } from 'rsuite';
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
  const updatedSessionsDefinition = useMemo(() => {
    const sd = followUp
      ? sessionsDefinition.filter(s => s.followUp)
      : sessionsDefinition.filter(s => !s.followUp);
    return sd.map(s => {
      return {
        name: s.name,
        id: s,
      };
    });
  }, [followUp, sessionsDefinition]);

  useEffect(() => {
    if (appointment) {
      console.log('IN use app', appointment, formValue);
      setFormValue({
        branchId: appointment.branch.id,
        type: appointment.type,
        patientId: appointment.patient.id,
        specialtyId: appointment.specialty.id,
        userId: appointment.doctor.id,
      });
      if (followUp && updatedSessionsDefinition.length > 0) {
        setFormValue({
          ...formValue,
          session: updatedSessionsDefinition[0].id,
          date: updatedSessionsDefinition[0].id.timer,
        });
      }
    }

    console.log(formValue, 'Form In  ouy Use');
  }, [appointment, followUp]);

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
    });
  }, [createAppointment, formValue, followUp, appointment]);

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
                    hideHours={hideHours}
                    startHour={8}
                    onSelectTrigger
                  />
                )}
              </div>
            </div>
            <Div display="flex">
              <Checkbox
                name="waiting"
                value={true}
                onChange={val => setFormValue({ ...formValue, waiting: val })}
              >
                {t('addToWaitingList')}
              </Checkbox>
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
