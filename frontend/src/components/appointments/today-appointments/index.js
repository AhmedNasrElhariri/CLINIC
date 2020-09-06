import React, { useMemo, useCallback } from 'react';
import * as R from 'ramda';
import { useMutation } from '@apollo/client';
import { Alert } from 'rsuite';

import { Div } from 'components';
import { SET_APPOINTMENT_DONE } from 'apollo-client/queries';
import ListAppointments from './list-appointments';

import useFetchAppointments from 'hooks/fetch-appointments';
import useFetchAccountingData from 'components/accounting/accounting-container/fetch-data';

function TodayAppointments() {
  const { todayAppointments: appointments } = useFetchAppointments();
  const { refetchRevenues } = useFetchAccountingData();
  const [setAppointmentDone] = useMutation(SET_APPOINTMENT_DONE, {
    refetchQueries: () => [refetchRevenues()],
    onCompleted: () => {
      Alert.success('Appointment has been Archived successfully');
    },
  });

  const upcomingAppointments = useMemo(
    () => R.pipe(R.filter(R.propEq('status', 'Scheduled')))(appointments),
    [appointments]
  );

  const completedAppointments = useMemo(
    () =>
      R.pipe(
        R.filter(
          R.propSatisfies(
            status => status === 'Done' || status === 'Archived',
            'status'
          )
        )
      )(appointments),
    [appointments]
  );

  const onClickDone = useCallback(
    appointment => setAppointmentDone({ variables: { id: appointment.id } }),
    [setAppointmentDone]
  );

  return (
    <>
      <ListAppointments
        title="Upcoming Appointments"
        appointments={upcomingAppointments}
        onDone={onClickDone}
        defaultExpanded={true}
      />
      <Div my={5} />
      <ListAppointments
        title="Completed Appointments"
        appointments={completedAppointments}
        onDone={onClickDone}
      />
    </>
  );
}

export default TodayAppointments;
