import React, { useRef, useMemo, useCallback } from 'react';
import * as R from 'ramda';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  List,
  FlexboxGrid,
  Button,
  Icon,
  Alert,
  PanelGroup,
  Panel,
  Divider,
} from 'rsuite';
import ReactToPrint from 'react-to-print';

import { LIST_APPOINTMENTS } from 'apollo-client/queries';
import { AppointmentPrintout, AdjustAppointment, Div } from 'components';
import { getStartOfDay, format, getEndOfDay } from 'services/date.service';
import { isScheduled } from 'services/appointment';
import { SET_APPOINTMENT_DONE } from 'apollo-client/queries';
import { isAfterMoment } from 'utils/date';
import ListAppointments from './list-appointments';

function AppointmentCalendar() {
  const history = useHistory();
  const componentRef = useRef();
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
        title="Upcoming"
        appointments={upcomingAppointments}
        onDone={onClickDone}
      />
      <Div my={5} />
      <ListAppointments
        title="Completed"
        appointments={completedAppointments}
        onDone={onClickDone}
      />
    </>
    // <PanelGroup>
    //   <Panel header="Upcoming">
    //     <ListAppointments
    //       appointments={upcomingAppointments}
    //       onDone={onClickDone}
    //     />
    //   </Panel>
    //   <Panel header="Completed">
    //     <ListAppointments
    //       appointments={completedAppointments}
    //       onDone={onClickDone}
    //     />
    //   </Panel>
    // </PanelGroup>
  );
}

export default AppointmentCalendar;
