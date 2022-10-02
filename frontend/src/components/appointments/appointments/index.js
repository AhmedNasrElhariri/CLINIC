import React, { useState, useEffect, useCallback } from 'react';
import Filter from './filter';
import BranchFilter from '../../filters';
import { Nav } from 'rsuite';
import * as R from 'ramda';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useAppointments, useModal } from 'hooks';
import { getName } from 'services/accounting';
import BusinessNotes from '../today-appointments/business-notes';
import ArchiveAppointment from '../archive-appointment';
import CompleteAppointment from '../complete-appointment';
import ListAppointments from './../today-appointments/list-appointments';
import NewAppointment from 'components/appointments/new-appointment';
import EditAppointment from 'components/appointments/edit-appointment';
import CancelAppointment from 'components/appointments/cancel-appointment';
import { ACTIONS, APPT_STATUS } from 'utils/constants';
const calcDate = ({ date, time }) =>
  moment(date)
    .set({
      hour: moment(time).get('hour'),
      minute: moment(time).get('minute'),
      second: 0,
      millisecond: 0,
    })
    .toDate();
const inialCurrentPage = {
  activePage: 1,
};
const initialValue = {
  businessNotes: '',
};
const tabVsStatus = new Map([
  [0, APPT_STATUS.SCHEDULED],
  [1, APPT_STATUS.WAITING],
  [2, APPT_STATUS.ARCHIVED],
]);
function Appointments() {
  const [formValue, setFormValue] = useState({
    date: [],
    patient: '',
    status: 'Scheduled',
  });
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const page = currentPage?.activePage;
  const [notes, setNotes] = useState(initialValue);
  const { t } = useTranslation();
  const { visible, close, open } = useModal({});
  const {
    appointments,
    refetchAppointments,
    filterBranches,
    archive,
    complete,
    updateNotes,
    adjust,
    cancel,
    pages
  } = useAppointments({
    page,
    dateFrom: R.pathOr(null, ['date', 0])(formValue),
    dateTo: R.pathOr(null, ['date', 1])(formValue),
    status: R.propOr(null, 'status')(formValue),
    type: R.propOr(null, 'type')(formValue),
    patient: R.propOr('', 'patient')(formValue),
    action: ACTIONS.List_Appointment,
  });
  
  const [popUp, setPopUp] = useState('');
  const [appointment, setAppointment] = useState(null);
  const onClickDone = useCallback(
    appointment => {
      setAppointment(appointment);
      setPopUp('archive');
      open();
    },
    [open]
  );
  const onCompleteDone = useCallback(
    appointment => {
      setAppointment(appointment);
      setPopUp('complete');
      open();
    },
    [open]
  );
  const onAddBusinessNotes = useCallback(
    appointment => {
      setPopUp('notes');
      setAppointment(appointment);
      open();
    },
    [open]
  );
  const onDuplicateAppointments = useCallback(
    appointment => {
      setPopUp('newAppointment');
      setAppointment(appointment);
      open();
    },
    [open]
  );
  const onEditAppointments = useCallback(
    appointment => {
      setPopUp('editAppointment');
      setAppointment(appointment);
      open();
    },
    [open]
  );
  const onCancelAppointments = useCallback(
    appointment => {
      setPopUp('cancelAppointment');
      setAppointment(appointment);
      open();
    },
    [open]
  );

  const handleArchive = useCallback(
    ({
      sessions,
      items,
      discount,
      others,
      remaining,
      payOfRemaining,
      bank,
      company,
      option,
      appPrice,
      othersName,
      coupons,
      couponsValue,
      doctorFees,
    }) => {
      close();
      archive({
        variables: {
          id: appointment.id,
          specialtyId: appointment?.specialty.id,
          userId: appointment?.doctor.id,
          branchId: appointment?.branch.id,
          date: appointment.date,
          sessions: sessions.map(session => ({
            name: getName({ session, appointment }),
            price: session.price,
            number: session.number,
            id: session.id,
          })),
          items: items.map(({ itemId, quantity }) => ({
            itemId,
            quantity,
          })),
          discount: {
            name: `discount-${appointment.patient.name}`,
            amount: discount,
          },
          others: {
            name: `others-${appointment.patient.name}`,
            amount: others,
          },
          remaining: remaining,
          payOfRemaining: payOfRemaining,
          patientName: appointment.patient.name,
          patientId: appointment.patient.id,
          bank,
          appPrice,
          company,
          option,
          coupons,
          couponsValue,
          doctorFees: doctorFees,
        },
      });
    },
    [appointment, archive, close]
  );
  const addBusinessNotes = useCallback(() => {
    close();
    updateNotes({
      variables: {
        id: appointment.id,
        notes: notes.businessNotes,
      },
    });
  }, [appointment, updateNotes, notes, close]);
  const handleEdit = useCallback(
    formValue => {
      close();
      adjust({
        variables: {
          id: appointment.id,
          date: calcDate(formValue),
          branchId: formValue.branchId,
          specialtyId: formValue.specialtyId,
          userId: formValue.userId,
        },
      });
    },
    [adjust, appointment, close]
  );
  const handleCancel = useCallback(() => {
    close();
    cancel({ variables: { id: appointment.id } });
  }, [cancel, appointment, close]);
  const handleComplete = useCallback(
    ({ appointment }) => {
      close();
      complete({
        variables: {
          id: appointment.id,
        },
      });
    },
    [complete, close]
  );
  useEffect(() => {
    setNotes(val => ({
      businessNotes: R.propOr('', 'businessNotes')(appointment),
    }));
  }, [appointment]);
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <>
      <h1 className="text-2xl mb-4">{t('appointments')}</h1>
      <Nav
        activeKey={activeIndex}
        onSelect={i => {
          setActiveIndex(i);
          setFormValue({ ...formValue, status: tabVsStatus.get(i) });
        }}
        appearance="tabs"
        justified
        className="text-center max-w-5xl mb-5"
      >
        <Nav.Item eventKey={0}>{t('mainAppointments')}</Nav.Item>
        <Nav.Item eventKey={1}>{t('waitingAppointments')}</Nav.Item>
        <Nav.Item eventKey={2}>{t('completedAppointments')}</Nav.Item>
      </Nav>

      {activeIndex === 0 && (
        <BranchFilter
          appointments={appointments}
          branches={filterBranches}
          render={apps => (
            <>
              <Filter formValue={formValue} onChange={setFormValue} />
              <ListAppointments
                appointments={apps}
                onArchive={onClickDone}
                onComplete={onCompleteDone}
                onAddBusinessNotes={onAddBusinessNotes}
                onDuplicateAppointments={onDuplicateAppointments}
                onEditAppointments={onEditAppointments}
                onCancelAppointments={onCancelAppointments}
                defaultExpanded={true}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pages={pages}
              />
            </>
          )}
        />
      )}
      {activeIndex === 1 && (
        <BranchFilter
          appointments={appointments}
          branches={filterBranches}
          render={apps => (
            <>
              <Filter formValue={formValue} onChange={setFormValue} />
              <ListAppointments
                appointments={apps}
                onArchive={onClickDone}
                onComplete={onCompleteDone}
                onAddBusinessNotes={onAddBusinessNotes}
                defaultExpanded={true}
                waiting={true}
              />
            </>
          )}
        />
      )}
      {activeIndex === 2 && (
        <BranchFilter
          appointments={appointments}
          branches={filterBranches}
          render={apps => (
            <>
              <Filter formValue={formValue} onChange={setFormValue} />
              <ListAppointments
                appointments={apps}
                onArchive={onClickDone}
                onComplete={onCompleteDone}
                onAddBusinessNotes={onAddBusinessNotes}
                defaultExpanded={true}
                waiting={true}
              />
            </>
          )}
        />
      )}

      {popUp === 'archive' && (
        <ArchiveAppointment
          appointment={appointment}
          show={visible}
          onCancel={close}
          onOk={handleArchive}
        />
      )}
      {popUp === 'complete' && (
        <CompleteAppointment
          appointment={appointment}
          show={visible}
          onCancel={close}
          onOk={handleComplete}
        />
      )}
      {popUp === 'notes' && (
        <BusinessNotes
          appointment={appointment}
          show={visible}
          onCancel={close}
          t={t}
          notes={notes}
          setNotes={setNotes}
          onOk={addBusinessNotes}
        />
      )}
      {popUp === 'newAppointment' && (
        <NewAppointment
          show={visible}
          onHide={close}
          appointment={appointment}
        />
      )}
      {popUp === 'editAppointment' && (
        <EditAppointment
          onOk={handleEdit}
          show={visible}
          onCancel={close}
          appointment={appointment}
          t={t}
        />
      )}
      {popUp === 'cancelAppointment' && (
        <CancelAppointment
          onOk={handleCancel}
          show={visible}
          onCancel={close}
          appointment={appointment}
          t={t}
        />
      )}
    </>
  );
}

export default Appointments;
