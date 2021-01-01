import React, { useMemo, useCallback, useState } from 'react';
import * as R from 'ramda';
import { useMutation } from '@apollo/client';
import { Alert } from 'rsuite';

import { Div } from 'components';
import {
  ARCHIVE_APPOINTMENT,
  SET_APPOINTMENT_DONE,
} from 'apollo-client/queries';
import ListAppointments from './list-appointments';

import useFetchAppointments from 'hooks/fetch-appointments';
import useFetchAccountingData from 'components/accounting/accounting-container/fetch-data';
import { Can } from 'components/user/can';
import { useModal } from 'components/widgets/modal';
import FinishAppointment from '../finish-appointments';
import useGlobalState from 'state';
import { getName } from 'services/accounting';
import useFetchInventory from 'hooks/fetch-inventory';

import ToolBar from './toolbar';
import {
  filterTodayAppointments,
  sortAppointments,
} from 'services/appointment';

function TodayAppointments() {
  const {
    todayAppointments: appointments,
    branches,
    doctors,
    specializations,
  } = useFetchAppointments();

  const [formValue, setFormValue] = useState({});

  const filteredAppointments = useMemo(
    () => sortAppointments(filterTodayAppointments(appointments, formValue)),
    [appointments, formValue]
  );

  const { refetchRevenues, refetchExpenses } = useFetchAccountingData();
  const { refetchInventory, refetchInventoryHistory } = useFetchInventory();
  const { visible, close, open } = useModal({});
  const [appointment, setAppointment] = useState(null);

  const [clinic] = useGlobalState('currentClinic');

  const [setAppointmentDone] = useMutation(SET_APPOINTMENT_DONE, {
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

  const [archive] = useMutation(ARCHIVE_APPOINTMENT, {
    onCompleted: () => {
      Alert.success('Appointment has been Archived successfully');
    },
  });

  const upcomingAppointments = useMemo(
    () =>
      R.pipe(
        R.filter(
          R.propSatisfies(
            status =>
              status === 'Scheduled' ||
              status === 'Archived' ||
              status === 'Done',
            'status'
          )
        )
      )(filteredAppointments),
    [filteredAppointments]
  );

  const completedAppointments = useMemo(
    () =>
      R.pipe(
        R.filter(R.propSatisfies(status => status === 'Closed', 'status'))
      )(filteredAppointments),
    [filteredAppointments]
  );

  const onClickDone = useCallback(
    appointment => {
      setAppointment(appointment);
      open();
    },
    [open]
  );

  const handleOk = useCallback(
    ({ sessions, items, discount }) => {
      close();
      setAppointmentDone({
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
    [appointment, close, setAppointmentDone]
  );

  const handleArchive = useCallback(
    ({ id }) => {
      archive({
        variables: { id },
      });
    },
    [archive]
  );
  return (
    <>
      <Can I="list" an="Appointment">
        <ToolBar
          formValue={formValue}
          onChange={setFormValue}
          branches={branches}
          doctors={doctors}
          specializations={specializations}
        />
        <ListAppointments
          title="Upcoming Appointments"
          appointments={upcomingAppointments}
          onDone={onClickDone}
          onArchive={handleArchive}
          defaultExpanded={true}
        />
      </Can>
      <Div my={5} />
      <Can I="list" an="Appointment">
        <ListAppointments
          title="Completed Appointments"
          appointments={completedAppointments}
          onDone={onClickDone}
          defaultExpanded={true}
        />
      </Can>
      <FinishAppointment
        show={visible}
        onCancel={close}
        onOk={handleOk}
        clinic={clinic}
      />
    </>
  );
}

export default TodayAppointments;
