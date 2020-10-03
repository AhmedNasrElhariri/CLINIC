import React, { useMemo, useCallback, useState } from 'react';
import * as R from 'ramda';
import { useMutation } from '@apollo/client';
import { Alert } from 'rsuite';

import { Div } from 'components';
import { SET_APPOINTMENT_DONE } from 'apollo-client/queries';
import ListAppointments from './list-appointments';

import useFetchAppointments from 'hooks/fetch-appointments';
import useFetchAccountingData from 'components/accounting/accounting-container/fetch-data';
import { Can } from 'components/user/can';
import { useModal } from 'components/widgets/modal';
import FinishAppointment from '../finish-appointments';
import useGlobalState from 'state';
import {
  getName,
  getNameByType,
  getAppointmentprice,
} from 'services/accounting';
import { isSession } from 'services/appointment';

function TodayAppointments() {
  const { todayAppointments: appointments } = useFetchAppointments();
  const { refetchRevenues } = useFetchAccountingData();
  const { visible, close, open } = useModal({});
  const [appointment, setAppointment] = useState(null);

  const [clinic] = useGlobalState('currentClinic');

  const [setAppointmentDone] = useMutation(SET_APPOINTMENT_DONE, {
    refetchQueries: () => [refetchRevenues()],
    onCompleted: () => {
      Alert.success('Appointment has been Archived successfully');
    },
  });

  const upcomingAppointments = useMemo(
    () =>
      R.pipe(
        R.filter(
          R.propSatisfies(
            status => status === 'Scheduled' || status === 'Archived',
            'status'
          )
        )
      )(appointments),
    [appointments]
  );

  const completedAppointments = useMemo(
    () => R.pipe(R.filter(R.propEq('status', 'Done')))(appointments),
    [appointments]
  );

  const onClickDone = useCallback(
    appointment => {
      setAppointment(appointment);
      if (isSession(appointment)) {
        open();
      } else {
        setAppointmentDone({
          variables: {
            id: appointment.id,
            sessions: [
              {
                name: getNameByType(appointment),
                price: getAppointmentprice(appointment.type, clinic),
              },
            ],
          },
        });
      }
    },
    [clinic, open, setAppointmentDone]
  );

  const handleOk = useCallback(
    sessions => {
      close();
      setAppointmentDone({
        variables: {
          id: appointment.id,
          sessions: sessions.map(session => ({
            name: getName({ session, appointment }),
            price: session.price,
          })),
        },
      });
    },
    [appointment, close, setAppointmentDone]
  );

  return (
    <>
      <Can I="list" an="Appointment">
        <ListAppointments
          title="Upcoming Appointments"
          appointments={upcomingAppointments}
          onDone={onClickDone}
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
