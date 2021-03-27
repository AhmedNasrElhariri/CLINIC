import React, { useMemo, useCallback, useState } from 'react';
import * as R from 'ramda';
import { useMutation } from '@apollo/client';
import { Alert } from 'rsuite';
import { Div } from 'components';
import { ARCHIVE_APPOINTMENT } from 'apollo-client/queries';
import ListAppointments from './list-appointments';
import FinishAppointment from '../finish-appointments';
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
      <FinishAppointment
        appointment={appointment}
        show={visible}
        onCancel={close}
        onOk={handleArchive}
      />
    </>
  );
}

export default TodayAppointments;
