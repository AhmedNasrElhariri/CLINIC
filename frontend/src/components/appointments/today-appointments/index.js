import React, { useMemo, useCallback, useState, useEffect } from 'react';
import * as R from 'ramda';
import { useMutation } from '@apollo/client';
import { Alert } from 'rsuite';

import { CRTabs } from 'components';

import {
  ARCHIVE_APPOINTMENT,
  UPDATE_BUSINESS_NOTES,
  COMPLETE_APPOINTMENT,
} from 'apollo-client/queries';
import ListAppointments from './list-appointments';
import ArchiveAppointment from '../archive-appointment';
import CompleteAppointment from '../complete-appointment';
import { getName } from 'services/accounting';
import { useInventory, useAppointments, useAccounting, useModal } from 'hooks';
import BusinessNotes from './business-notes';
import {
  filterTodayAppointments,
  sortAppointments,
} from 'services/appointment';
import Filter from '../../filters';
import { APPT_STATUS } from 'utils/constants';
const initialValue = {
  businessNotes: '',
};
function TodayAppointments() {
  const { todayAppointments: appointments, filterBranches } = useAppointments();
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
  const patientName = appointment?.patient.name;
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
  const [complete] = useMutation(COMPLETE_APPOINTMENT, {
    onCompleted: () => {
      Alert.success('Appointment has been Completed successfully');
    },
  });
  const [updateNotes] = useMutation(UPDATE_BUSINESS_NOTES, {
    onCompleted: () => {
      Alert.success('Business Notes Added Successfully');
    },
  });
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
  const onClickComplete = useCallback(
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
            name: 'discount' + ' - ' + patientName,
            amount: discount,
          },
          others: {
            name: 'others - ' + othersName + ' - ' + patientName,
            amount: others,
          },
          patientName: patientName,
          bank,
          appPrice,
          company,
          option,
        },
      });
    },
    [appointment, archive, close]
  );
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
                  onComplete={onClickComplete}
                  onAddBusinessNotes={onAddBusinessNotes}
                  defaultExpanded={true}
                />
              )}
            />
          </CRTabs.CRContent>
          <CRTabs.CRContent>
            <ListAppointments
              appointments={waitingAppointments}
              onArchive={onClickDone}
              onComplete={onClickComplete}
              onAddBusinessNotes={onAddBusinessNotes}
              defaultExpanded={true}
              waiting={true}
            />
          </CRTabs.CRContent>
          <CRTabs.CRContent>
            <ListAppointments
              title="Completed Appointments"
              appointments={completedAppointments}
              onAddBusinessNotes={onAddBusinessNotes}
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
    </>
  );
}

export default TodayAppointments;
