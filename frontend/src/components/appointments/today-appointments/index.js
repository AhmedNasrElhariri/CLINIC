import React, { useMemo, useCallback, useState } from 'react';
import * as R from 'ramda';
import { useMutation } from '@apollo/client';
import { Alert } from 'rsuite';
import { Div } from 'components';
import { ARCHIVE_APPOINTMENT } from 'apollo-client/queries';
import ListAppointments from './list-appointments';
import ArchiveAppointment from '../archive-appointments';
import { getName } from 'services/accounting';
import { useInventory, useAppointments, useAccounting, useModal } from 'hooks';

import {
  filterTodayAppointments,
  sortAppointments,
} from 'services/appointment';
import { APPT_STATUS } from 'utils/constants';

function TodayAppointments() {
  const { todayAppointments: appointments } = useAppointments();

  const [formValue] = useState({});

  const filteredAppointments = useMemo(
    () => sortAppointments(filterTodayAppointments(appointments, formValue)),
    [appointments, formValue]
  );

  const { refetchRevenues, refetchExpenses } = useAccounting();
  const { refetchInventory, refetchInventoryHistory } = useInventory();
  const { visible, close, open } = useModal({});
  const [appointment, setAppointment] = useState(null);

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

  const upcomingAppointments = useMemo(
    () =>
      R.pipe(R.filter(R.propEq('status', APPT_STATUS.SCHEDULED)))(
        filteredAppointments
      ),
    [filteredAppointments]
  );
<<<<<<< HEAD

=======
  
  const waitingAppointments = useMemo(
    () =>
      R.pipe(R.filter(R.propEq('status', APPT_STATUS.WAITING)))(
        filteredAppointments
      ),
    [filteredAppointments]
  );
>>>>>>> 27c3281... resolve the bugs
  const completedAppointments = useMemo(
    () =>
      R.pipe(R.filter(R.propEq('status', APPT_STATUS.ARCHIVED)))(
        filteredAppointments
      ),
    [filteredAppointments]
  );

  const onClickDone = useCallback(
    appointment => {
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

  return (
    <>
      {/* <ToolBar
        formValue={formValue}
        onChange={setFormValue}
        branches={branches}
        doctors={doctors}
        specialties={specialties}
      /> */}
<<<<<<< HEAD
      <ListAppointments
        title="Upcoming Appointments"
        appointments={upcomingAppointments}
        onArchive={onClickDone}
        defaultExpanded={true}
      />
      <Div my={5} />
      <ListAppointments
        title="Completed Appointments"
        appointments={completedAppointments}
        defaultExpanded={true}
      />
      <ArchiveAppointment
        appointment={appointment}
        show={visible}
        onCancel={close}
        onOk={handleArchive}
      />
=======
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
>>>>>>> 27c3281... resolve the bugs
    </>
  );
}

export default TodayAppointments;
