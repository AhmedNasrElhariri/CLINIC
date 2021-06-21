import React, { useState, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { filterAppointments, sortAppointments } from 'services/appointment';
import { Div, H3, CRTabs } from 'components';
import Filter from './filter';
import { Alert } from 'rsuite';
import { useMutation } from '@apollo/client';
import { ARCHIVE_APPOINTMENT } from 'apollo-client/queries';
import { useInventory, useAppointments, useAccounting, useModal } from 'hooks';
import { getName } from 'services/accounting';
import ArchiveAppointment from '../archive-appointment';
import ListAppointments from './../today-appointments/list-appointments';

function Appointments() {
  const history = useHistory();
  const [formValue, setFormValue] = useState({ date: [], patient: '' });
  const { visible, close, open } = useModal({});
  const { appointments } = useAppointments();
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
    ],
    onCompleted: () => {
      Alert.success('Appointment has been Archived successfully');
    },
  });
  const handleArchive = useCallback(
    ({ sessions, items, discount, appPrice, option }) => {
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
          appPrice,
        },
      });
    },
    [appointment, archive, close]
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
                defaultExpanded={true}
              />
            </CRTabs.CRContent>
            <CRTabs.CRContent>
              <ListAppointments
                appointments={filterByStatus(filteredAppointments, 'Waiting')}
                onArchive={onClickDone}
                defaultExpanded={true}
                waiting={true}
              />
            </CRTabs.CRContent>
            <CRTabs.CRContent>
              <ListAppointments
                appointments={filterByStatus(filteredAppointments, 'Archived')}
                onArchive={onClickDone}
                defaultExpanded={true}
                waiting={true}
              />
            </CRTabs.CRContent>
          </CRTabs.CRContentGroup>
        </CRTabs>
      </Div>
      <ArchiveAppointment
        appointment={appointment}
        show={visible}
        onCancel={close}
        onOk={handleArchive}
      />
    </>
  );
}

export default Appointments;
