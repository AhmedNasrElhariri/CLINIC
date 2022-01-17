import React, { useMemo, useCallback, useState, useEffect } from 'react';
import * as R from 'ramda';
import { ACTIONS } from 'utils/constants';
import { CRTabs } from 'components';
import ListAppointments from './list-appointments';
import ArchiveAppointment from '../archive-appointment';
import { getName } from 'services/accounting';
import CompleteAppointment from '../complete-appointment';
import { useAppointments, useModal } from 'hooks';
import BusinessNotes from './business-notes';
import NewAppointment from 'components/appointments/new-appointment';
import {
  filterTodayAppointments,
  sortAppointmentsByUpdatedAt,
} from 'services/appointment';
import Filter from '../../filters';
import { APPT_STATUS } from 'utils/constants';
const initialValue = {
  businessNotes: '',
};

function TodayAppointments() {
  const [popUp, setPopUp] = useState('');
  const [formValue] = useState({});
  const [notes, setNotes] = useState(initialValue);
  const { visible, close, open } = useModal({});
  const [appointment, setAppointment] = useState(null);
  const {
    todayAppointments: appointments,
    filterBranches,
    archive,
    complete,
    archiveLoading: loading,
    updateNotes,
  } = useAppointments({
    action: ACTIONS.List_Appointment,
  });
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
  const handleArchive = useCallback(
    ({
      sessions,
      items,
      discount,
      others,
      bank,
      company,
      option,
      appPrice,
      othersName,
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
          })),
          items: items.map(({ itemId, quantity }) => ({
            itemId,
            quantity,
          })),
          discount: {
            name: 'discount' + ' - ' + appointment.patient.name,
            amount: discount,
          },
          others: {
            name: 'others - ' + othersName + ' - ' + appointment.patient.name,
            amount: others,
          },
          patientName: appointment.patient.name,
          bank,
          appPrice,
          company,
          option,
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
  }, [appointment, updateNotes, notes]);
  const handleComplete = useCallback(
    ({ appointment }) => {
      close();
      complete({
        variables: {
          id: appointment?.id,
        },
      });
    },
    [appointment, complete, close]
  );
  return (
    <>
      <CRTabs>
        <CRTabs.CRTabsGroup>
          <CRTabs.CRTab>Main Appointments</CRTabs.CRTab>
          <CRTabs.CRTab>Waiting Appointments</CRTabs.CRTab>
          <CRTabs.CRTab>Completed Appointments</CRTabs.CRTab>
        </CRTabs.CRTabsGroup>
        <CRTabs.CRContentGroup>
          <CRTabs.CRContent>
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
                  defaultExpanded={true}
                  close={close}
                />
                
              )}
            />
          </CRTabs.CRContent>
          <CRTabs.CRContent>
            <Filter
              appointments={waitingAppointments}
              branches={filterBranches}
              render={apps => (
                <ListAppointments
                  appointments={apps}
                  onArchive={onClickDone}
                  onComplete={onCompleteDone}
                  onAddBusinessNotes={onAddBusinessNotes}
                  defaultExpanded={true}
                  waiting={true}
                />
              )}
            />
          </CRTabs.CRContent>
          <CRTabs.CRContent>
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
          </CRTabs.CRContent>
        </CRTabs.CRContentGroup>
      </CRTabs>
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
        />
      )}
      {popUp === 'newAppointment' && (
        <NewAppointment
          show={visible}
          onHide={close}
          appointment={appointment}
        />
      )}
    </>
  );
}

export default TodayAppointments;
