import React, { useState, useMemo, useCallback } from 'react';
import { filterAppointments, sortAppointments } from 'services/appointment';
import { Div, H3, CRTabs } from 'components';
import Filter from './filter';
import { Alert } from 'rsuite';
import { useMutation } from '@apollo/client';
import {
  ARCHIVE_APPOINTMENT,
  COMPLETE_APPOINTMENT,
} from 'apollo-client/queries';
import { useInventory, useAppointments, useAccounting, useModal } from 'hooks';
import { getName } from 'services/accounting';
import ArchiveAppointment from '../archive-appointment';
import CompleteAppointment from '../complete-appointment';
import ListAppointments from './../today-appointments/list-appointments';
const inialCurrentPage = {
  activePage: 1,
};
function Appointments() {
  const [formValue, setFormValue] = useState({ date: [], patient: '' });
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const page = currentPage?.activePage;
  const { visible, close, open } = useModal({});
  const { appointments, appointmentsCount, refetchAppointments } =
    useAppointments({ page });
  const pages = Math.ceil(appointmentsCount / 20);
  const [popUp, setPopUp] = useState('');
  const [appointment, setAppointment] = useState(null);
  const { refetchRevenues, refetchExpenses } = useAccounting();
  const { refetchInventory, refetchInventoryHistory } = useInventory();
  const filteredAppointments = useMemo(
    () => sortAppointments(filterAppointments(appointments, formValue)),
    [appointments, formValue]
  );
  const filterByStatus = (appointments, filter) => {
    return !filter
      ? appointments
      : appointments.filter(app => app.status === filter);
  };
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
  const [archive] = useMutation(ARCHIVE_APPOINTMENT, {
    refetchQueries: () => [
      refetchRevenues,
      refetchExpenses,
      refetchInventory,
      refetchInventoryHistory,
      refetchAppointments,
    ],
    onCompleted: () => {
      Alert.success('Appointment has been Archived successfully');
    },
  });
  const [complete] = useMutation(COMPLETE_APPOINTMENT, {
    refetchQueries: () => [refetchAppointments],
    onCompleted: () => {
      Alert.success('Appointment has been Completed successfully');
    },
  });
  const handleArchive = useCallback(
    ({ sessions, items, discount, option }) => {
      close();
      archive({
        variables: {
          id: appointment.id,
          sessions: sessions.map(session => ({
            name: getName({ session, appointment }),
            price: session.price,
            number: session.number,
          })),
          items: items.map(({ itemId, quantity }) => ({
            itemId,
            quantity,
          })),
          discount,
          option,
        },
      });
    },
    [appointment, archive, close]
  );
  const handleComplete = useCallback(
    appointment => {
      close();
      complete({
        variables: {
          id: appointment.id,
        },
      });
    },
    [appointment, complete, close]
  );
  return (
    <>
      <H3 mb={64}>Appointments</H3>
      <Div mb={4}>
        <Filter formValue={formValue} onChange={setFormValue} />
        <CRTabs>
          <CRTabs.CRTabsGroup>
            <CRTabs.CRTab>Main Appointments</CRTabs.CRTab>
            <CRTabs.CRTab>Waiting Appointments</CRTabs.CRTab>
            <CRTabs.CRTab>Completed Appointments</CRTabs.CRTab>
          </CRTabs.CRTabsGroup>
          <CRTabs.CRContentGroup>
            <CRTabs.CRContent>
              <ListAppointments
                appointments={filterByStatus(filteredAppointments, 'Scheduled')}
                onArchive={onClickDone}
                onComplete={onCompleteDone}
                defaultExpanded={true}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pages={pages}
              />
            </CRTabs.CRContent>
            <CRTabs.CRContent>
              <ListAppointments
                appointments={filterByStatus(filteredAppointments, 'Waiting')}
                onArchive={onClickDone}
                onComplete={onCompleteDone}
                defaultExpanded={true}
                waiting={true}
              />
            </CRTabs.CRContent>
            <CRTabs.CRContent>
              <ListAppointments
                appointments={filterByStatus(filteredAppointments, 'Archived')}
                onArchive={onClickDone}
                onComplete={onCompleteDone}
                defaultExpanded={true}
                waiting={true}
              />
            </CRTabs.CRContent>
          </CRTabs.CRContentGroup>
        </CRTabs>
      </Div>
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
    </>
  );
}

export default Appointments;
