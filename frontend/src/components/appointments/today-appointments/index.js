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
import {
  getName,
  getNameByType,
  getAppointmentprice,
} from 'services/accounting';
import { isSession } from 'services/appointment';
import useFetchInventory from 'hooks/fetch-inventory';

import ToolBar from './toolbar';
import {
  filterTodayAppointments,
  sortAppointments,
} from 'services/appointment';

const appointments_dummy = [
  {
    doctor_id: '123',
    doctor_name: 'Hana',
    specialization_id: '321',
    specialization_name: 'surgery',
    date: '2020-12-02T14:10:52.945Z',
    id: '6a4fb887-5c61-48c8-aa4b-280179dbf8eq',
    status: 'Archived',
    type: 'Examination',
    __typename: 'Appointment',
    patient: {
      branch: 'Giza',
      age: 21,
      id: '8f7231b1-5755-4c33-8448-820376c473eq',
      name: 'Ahmed',
      phoneNo: '01065093577',
      sex: 'Male',
      __typename: 'Patient',
    },
  },
  {
    doctor_id: '124',
    doctor_name: 'Fatima',
    specialization_id: '421',
    specialization_name: 'bones',
    date: '2020-12-02T18:10:52.945Z',
    id: '6a4fb887-5c61-48c8-aa4b-280179dbf8ew',
    status: 'Done',
    type: 'Examination',
    __typename: 'Appointment',
    patient: {
      branch: 'Cairo',
      age: 21,
      id: '8f7231b1-5755-4c33-8448-820376c473ew',
      name: 'Khaled',
      phoneNo: '01065093577',
      sex: 'Male',
      __typename: 'Patient',
    },
  },
  {
    doctor_id: '125',
    doctor_name: 'Asmaa',
    specialization_id: '521',
    specialization_name: 'child',
    date: '2020-12-02T13:15:52.945Z',
    id: '6a4fb887-5c61-48c8-aa4b-280179dbf8er',
    status: 'Archived',
    type: 'Examination',
    __typename: 'Appointment',
    patient: {
      branch: 'Giza',
      age: 21,
      id: '8f7231b1-5755-4c33-8448-820376c473er',
      name: 'Mido',
      phoneNo: '01065093577',
      sex: 'Male',
      __typename: 'Patient',
    },
  },
  {
    doctor_id: '126',
    doctor_name: 'Nady',
    specialization_id: '621',
    specialization_name: 'heart',
    date: '2020-12-02T13:15:52.945Z',
    id: '6a4fb887-5c61-48c8-aa4b-280179dbf8et',
    status: 'Done',
    type: 'Examination',
    __typename: 'Appointment',
    patient: {
      branch: 'Cairo',
      age: 21,
      id: '8f7231b1-5755-4c33-8448-820376c473et',
      name: 'Amira',
      phoneNo: '01065093577',
      sex: 'Male',
      __typename: 'Patient',
    },
  },
];
const doctors = ['Hana', 'Fatima', 'Asmaa', 'Nady'];
const specializations = ['surgery', 'bones', 'child', 'heart'];

function TodayAppointments() {
  const { todayAppointments: appointments } = useFetchAppointments();

  const [formValue, setFormValue] = useState({});

  const filteredAppointments = useMemo(
    () =>
      sortAppointments(filterTodayAppointments(appointments_dummy, formValue)),
    [appointments_dummy, formValue]
  );

  const { refetchRevenues } = useFetchAccountingData();
  const { refetchInventory, refetchInventoryHistory } = useFetchInventory();
  const { visible, close, open } = useModal({});
  const [appointment, setAppointment] = useState(null);

  const [clinic] = useGlobalState('currentClinic');

  const [setAppointmentDone] = useMutation(SET_APPOINTMENT_DONE, {
    refetchQueries: () => [
      refetchRevenues,
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
    ({ sessions, items }) => {
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
