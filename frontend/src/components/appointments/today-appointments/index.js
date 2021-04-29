import React, { useMemo, useCallback, useState, useEffect } from 'react';
import * as R from 'ramda';
import { useMutation } from '@apollo/client';
import { Alert } from 'rsuite';

import { CRTabs, Div } from 'components';

import {
  ARCHIVE_APPOINTMENT,
  UPDATE_BUSINESS_NOTES,
} from 'apollo-client/queries';

import ListAppointments from './list-appointments';
import ArchiveAppointment from '../archive-appointments';
import { getName } from 'services/accounting';
import { useInventory, useAppointments, useAccounting, useModal } from 'hooks';
import BusinessNotes from './business-notes';
import {
  filterTodayAppointments,
  sortAppointments,
} from 'services/appointment';
import { APPT_STATUS } from 'utils/constants';
const initialValue = {
  businessNotes: '',
};
function TodayAppointments() {
  const { todayAppointments: appointments } = useAppointments();
  const [popUp, setPopUp] = useState('');
  const [formValue] = useState({});
  const [notes, setNotes] = useState(initialValue);
  const filteredAppointments = useMemo(
    () => sortAppointments(filterTodayAppointments(appointments, formValue)),
    [appointments, formValue]
  );

  const { refetchRevenues, refetchExpenses } = useAccounting();
  const { refetchInventory, refetchInventoryHistory } = useInventory();
  const { visible, close, open } = useModal({});
  const [appointment, setAppointment] = useState(null);
  useEffect(() => {
    setNotes(val => ({
      businessNotes: R.propOr('', 'businessNotes')(appointment),
    }));
  }, [appointment]);
  const [archive] = useMutation(ARCHIVE_APPOINTMENT, {
    refetchQueries: () => [
      refetchRevenues,
      refetchExpenses,
      refetchInventory,
      refetchInventoryHistory,
    ],
    onCompleted: () => {
      Alert.success('Appointment has been Archived successfully');
    },
  });
  const [updateNotes] = useMutation(UPDATE_BUSINESS_NOTES, {
    onCompleted: () => {
      Alert.success('Business Notes Added Successfully');
    },
  });

  const upcomingAppointments = useMemo(
    () =>
      R.pipe(R.filter(R.propEq('status', APPT_STATUS.SCHEDULED)))(
        filteredAppointments
      ),
    [filteredAppointments]
  );

  const waitingAppointments = useMemo(
    () =>
      R.pipe(R.filter(R.propEq('status', APPT_STATUS.WAITING)))(
        filteredAppointments
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
  const onAddBusinessNotes = useCallback(
    appointment => {
      setPopUp('notes');
      setAppointment(appointment);
      open();
    },
    [open]
  );
  const handleArchive = useCallback(
    ({ sessions, items, discount }) => {
      close();
      archive({
        variables: {
          id: appointment.id,
          sessions: sessions.map(session => ({
            name: getName({ session, appointment }),
            price: session.price,
          })),
          items: items.map(({ itemId, quantity }) => ({
            itemId,
            quantity,
          })),
          discount,
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
  return (
    <>
      {/* <ToolBar
        formValue={formValue}
        onChange={setFormValue}
        branches={branches}
        doctors={doctors}
        specialties={specialties}
      /> */}
      <CRTabs>
        <CRTabs.CRTabsGroup>
          <CRTabs.CRTab>Main Appointments</CRTabs.CRTab>
          <CRTabs.CRTab>Waiting Appointments</CRTabs.CRTab>
          <CRTabs.CRTab>Completed Appointments</CRTabs.CRTab>
        </CRTabs.CRTabsGroup>
        <CRTabs.CRContentGroup>
          <CRTabs.CRContent>
            <ListAppointments
              title="Upcoming Appointments"
              appointments={upcomingAppointments}
              onArchive={onClickDone}
              onAddBusinessNotes={onAddBusinessNotes}
              defaultExpanded={true}
            />
          </CRTabs.CRContent>
          <CRTabs.CRContent>
            <ListAppointments
              appointments={waitingAppointments}
              onArchive={onClickDone}
              defaultExpanded={true}
              waiting={true}
            />
          </CRTabs.CRContent>
          <CRTabs.CRContent>
            <ListAppointments
              title="Completed Appointments"
              appointments={completedAppointments}
              defaultExpanded={true}
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
    </>
  );
}

export default TodayAppointments;
