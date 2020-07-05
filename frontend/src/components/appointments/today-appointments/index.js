import React, { useMemo, useCallback } from 'react';
import * as R from 'ramda';
import { useMutation } from '@apollo/react-hooks';
import { Alert } from 'rsuite';

import { Div } from 'components';
import { SET_APPOINTMENT_DONE } from 'apollo-client/queries';
import ListAppointments from './list-appointments';

import useFetchAppointments from 'hooks/fetch-appointments';

function AppointmentCalendar() {
  const [setAppointmentDone] = useMutation(SET_APPOINTMENT_DONE, {
    onCompleted: () => {
      Alert.success('Appointment has been Archived successfully');
    },
  });

  const appointments = useFetchAppointments();
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

export default AppointmentCalendar;
