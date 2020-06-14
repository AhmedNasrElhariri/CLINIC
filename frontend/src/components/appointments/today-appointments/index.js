import React, { useMemo, useCallback } from 'react';
import * as R from 'ramda';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Alert } from 'rsuite';

import { LIST_APPOINTMENTS } from 'apollo-client/queries';
import { Div } from 'components';
import { SET_APPOINTMENT_DONE } from 'apollo-client/queries';
import { getStartOfDay, getEndOfDay } from 'services/date.service';
import ListAppointments from './list-appointments';

function AppointmentCalendar() {
  const [setAppointmentDone] = useMutation(SET_APPOINTMENT_DONE, {
    onCompleted: () => {
      Alert.success('Appointment has been Archived successfully');
    },
  });

  const { data } = useQuery(LIST_APPOINTMENTS, {
    variables: {
      input: {
        fromDate: getStartOfDay(new Date()),
        toDate: getEndOfDay(new Date()),
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const upcomingAppointments = useMemo(
    () =>
      R.pipe(
        R.propOr([], 'appointments'),
        R.reject(R.propEq('status', 'Done'))
      )(data),
    [data]
  );

  const completedAppointments = useMemo(
    () =>
      R.pipe(
        R.propOr([], 'appointments'),
        R.filter(R.propEq('status', 'Done'))
      )(data),
    [data]
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
