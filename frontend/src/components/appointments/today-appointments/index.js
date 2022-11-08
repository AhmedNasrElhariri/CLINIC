import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Nav } from 'rsuite';
import * as R from 'ramda';
import moment from 'moment';
import { ACTIONS } from 'utils/constants';
import ListAppointments from './list-appointments';
import ArchiveAppointment from '../archive-appointment';
import { getName } from 'services/accounting';
import CompleteAppointment from '../complete-appointment';
import { useAppointments, useModal } from 'hooks';
import BusinessNotes from './business-notes';
import NewAppointment from 'components/appointments/new-appointment';
import EditAppointment from '../edit-appointment';
import CancelAppointment from '../cancel-appointment';
import {
  filterTodayAppointments,
  sortAppointmentsByUpdatedAt,
} from 'services/appointment';
import Filter from '../../filters';
import { APPT_STATUS } from 'utils/constants';
import { useTranslation } from 'react-i18next';
const initialValue = {
  businessNotes: '',
};
const calcDate = ({ date, time }) =>
  moment(date)
    .set({
      hour: moment(time).get('hour'),
      minute: moment(time).get('minute'),
      second: 0,
      millisecond: 0,
    })
    .toDate();
function TodayAppointments() {
  const [popUp, setPopUp] = useState('');
  const [followUp, setFollowUp] = useState(false);
  const [formValue] = useState({});
  const [notes, setNotes] = useState(initialValue);
  const { visible, close, open } = useModal({});
  const [appointment, setAppointment] = useState(null);
  const { t } = useTranslation();
  const {
    todayAppointments: appointments,
    filterBranches,
    archive,
    complete,
    archiveLoading: loading,
    updateNotes,
    adjust,
    cancel,
  } = useAppointments({
    action: ACTIONS.List_Appointment,
    patientId: appointment?.patient?.id,
    onAdjust: () => {},
    setFollowUp,
    setPopUp,
    open,
  });
   console.log(followUp,popUp,'FFpopUp');
  const filteredAppointments = useMemo(
    () => filterTodayAppointments(appointments, formValue),
    [appointments, formValue]
  );

  useEffect(() => {
    setNotes(val => ({
      businessNotes: R.propOr('', 'businessNotes')(appointment),
    }));
  }, [appointment]);

  const upcomingAppointments = useMemo(
    () =>
      R.pipe(
        R.filter(
          R.propEq('status', APPT_STATUS.SCHEDULED) ||
            R.propEq('status', APPT_STATUS.CHANGED)
        )
      )(filteredAppointments),
    [filteredAppointments]
  );

  const waitingAppointments = useMemo(
    () =>
      sortAppointmentsByUpdatedAt(
        R.pipe(R.filter(R.propEq('status', APPT_STATUS.WAITING)))(
          filteredAppointments
        )
      ),
    [filteredAppointments]
  );
  const completedAppointments = useMemo(
    () =>
      R.pipe(R.filter(R.propEq('status', APPT_STATUS.ARCHIVED)))(
        filteredAppointments
      ),
    [filteredAppointments]
  );
  const onClickDone = useCallback(
    appointment => {
      setPopUp('archive');
      setAppointment(appointment);
      open();
    },
    [open]
  );
  const onCompleteDone = useCallback(
    appointment => {
      setPopUp('complete');
      setAppointment(appointment);
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
  const onFollowUpAppointments = useCallback(
    appointment => {
      setFollowUp(true);
      setPopUp('followUpAppointment');
      setAppointment(appointment);
      open();
    },
    [open]
  );
  console.log(popUp, appointment, 'POPAPP');
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
            name: 'others - ' + othersName + ' - ' + appointment.patient.name,
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
          id: appointment?.id,
        },
      });
    },
    [complete, close]
  );

  const [active, setActive] = React.useState('mainAppointments');

  return (
    <>
      <Nav
        onSelect={setActive}
        appearance="tabs"
        justified
        className="text-center max-w-5xl mb-5"
        activeKey={active}
      >
        <Nav.Item eventKey="mainAppointments">{t('mainAppointments')}</Nav.Item>
        <Nav.Item eventKey="waitingAppointments">
          {t('waitingAppointments')}
        </Nav.Item>
        <Nav.Item eventKey="completedAppointments">
          {t('completedAppointments')}
        </Nav.Item>
      </Nav>
      {active === 'mainAppointments' && (
        <Filter
          appointments={upcomingAppointments}
          branches={filterBranches}
          render={apps => (
            <ListAppointments
              title="Upcoming Appointments"
              appointments={apps}
              onArchive={onClickDone}
              onComplete={onCompleteDone}
              onAddBusinessNotes={onAddBusinessNotes}
              onDuplicateAppointments={onDuplicateAppointments}
              onEditAppointments={onEditAppointments}
              onCancelAppointments={onCancelAppointments}
              onFollowUpAppointments={onFollowUpAppointments}
              defaultExpanded={true}
              close={close}
            />
          )}
        />
      )}
      {active === 'waitingAppointments' && (
        <Filter
          appointments={waitingAppointments}
          branches={filterBranches}
          render={apps => (
            <ListAppointments
              appointments={apps}
              onArchive={onClickDone}
              onComplete={onCompleteDone}
              onAddBusinessNotes={onAddBusinessNotes}
              onDuplicateAppointments={onDuplicateAppointments}
              onEditAppointments={onEditAppointments}
              onCancelAppointments={onCancelAppointments}
              defaultExpanded={true}
              waiting={true}
            />
          )}
        />
      )}
      {active === 'completedAppointments' && (
        <Filter
          appointments={completedAppointments}
          branches={filterBranches}
          render={apps => (
            <ListAppointments
              title="Completed Appointments"
              appointments={apps}
              onAddBusinessNotes={onAddBusinessNotes}
              defaultExpanded={true}
            />
          )}
        />
      )}
      {popUp === 'archive' && (
        <ArchiveAppointment
          appointment={appointment}
          show={visible}
          onCancel={close}
          onOk={handleArchive}
          loading={loading}
        />
      )}
      {popUp === 'complete' && (
        <CompleteAppointment
          appointment={appointment}
          show={visible}
          onCancel={close}
          onOk={handleComplete}
          t={t}
        />
      )}
      {popUp === 'notes' && (
        <BusinessNotes
          appointment={appointment}
          show={visible}
          onCancel={close}
          notes={notes}
          setNotes={setNotes}
          onOk={addBusinessNotes}
          t={t}
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
      {popUp === 'followUpAppointment' && (
        <NewAppointment
          show={visible}
          onHide={close}
          appointment={appointment}
          followUp={followUp}
        />
      )}
    </>
  );
}

export default TodayAppointments;
