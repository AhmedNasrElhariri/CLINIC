import { useMemo } from 'react';
import * as R from 'ramda';
import { useMutation, useQuery } from '@apollo/client';
import { Alert } from 'rsuite';

import {
  LIST_USERS,
  ADD_SESSION_TO_DOCTOR,
  LIST_DOCTOR_SESSION_DEFINATION,
  DELETE_SESSION_TO_DOCTOR,
  LIST_DOCTOR_FEES,
  EDIT_DOCTOR_FEES,
  GATHER_DOCTOR_FEES,
  ADD_NEW_DOCTOR_FEES
} from 'apollo-client/queries';
import { POSITIONS } from 'utils/constants';

function useDoctor({
  onCreateSessionToDoctor,
  doctorId,
  page,
  dateFrom,
  dateTo,
  status,
  onEditDoctorFees,
} = {}) {
  const { data: usersData } = useQuery(LIST_USERS);
  const users = useMemo(
    () => R.propOr([], 'listUsers')(usersData),
    [usersData]
  );
  const doctors = useMemo(
    () => users.filter(u => u.position === POSITIONS.DOCTOR),
    [users]
  );

  const { data: doctorSessionsData } = useQuery(
    LIST_DOCTOR_SESSION_DEFINATION,
    { variables: { doctorId: doctorId } }
  );
  const doctorSessionsDefinations = useMemo(
    () => R.propOr([], 'doctorSessionsDefinations')(doctorSessionsData),
    [doctorSessionsData]
  );

  const { data: doctorFeesData } = useQuery(LIST_DOCTOR_FEES, {
    variables: Object.assign(
      {
        offset: (page - 1) * 20 || 0,
        limit: 20,
        doctorId,
        status,
      },
      dateFrom && { dateFrom },
      dateTo && { dateTo }
    ),
  });
  const doctorFees = doctorFeesData?.doctorFeesTransactions;
  const doctorFeesTransactions = R.propOr([], 'doctorFees')(doctorFees);
  const totalDoctorFees = R.propOr([], 'totalDoctorFees')(doctorFees);
  const doctorFeesCount = R.propOr([], 'doctorFeesCount')(doctorFees);
  /* mutations */

  const [addSessionToDoctor] = useMutation(ADD_SESSION_TO_DOCTOR, {
    onCompleted() {
      Alert.success('The session has been created Successfully');
      onCreateSessionToDoctor && onCreateSessionToDoctor();
    },
    refetchQueries: [
      {
        query: LIST_DOCTOR_SESSION_DEFINATION,
        variables: {
          doctorId: doctorId,
        },
      },
    ],
    onError(err) {
      err.message.includes(
        'Unique constraint failed on the fields: (`sessionId`,`doctorId`)'
      )
        ? Alert.error('You create this session to doctor exactly')
        : Alert.error(err.message);
    },
  });

  const [deleteSessionToDoctor] = useMutation(DELETE_SESSION_TO_DOCTOR, {
    onCompleted() {
      Alert.success('The session has been deleted Successfully');
      onCreateSessionToDoctor && onCreateSessionToDoctor();
    },
    refetchQueries: [
      {
        query: LIST_DOCTOR_SESSION_DEFINATION,
        variables: {
          doctorId: doctorId,
        },
      },
    ],
    onError(err) {
      Alert.error(err.message);
    },
  });
  const [editDoctorFees] = useMutation(EDIT_DOCTOR_FEES, {
    onCompleted() {
      Alert.success('The doctor fees has been edited Successfully');
      onEditDoctorFees && onEditDoctorFees();
    },
    refetchQueries: [
      {
        query: LIST_DOCTOR_FEES,
        variables: Object.assign(
          {
            offset: (page - 1) * 20 || 0,
            limit: 20,
            doctorId,
            status,
          },
          dateFrom && { dateFrom },
          dateTo && { dateTo }
        ),
      },
    ],
    onError(err) {
      Alert.error(err.message);
    },
  });
  const [addNewwDoctorFees] = useMutation(ADD_NEW_DOCTOR_FEES, {
    onCompleted() {
      Alert.success('The doctor fees has been added Successfully');
      onEditDoctorFees && onEditDoctorFees();
    },
    refetchQueries: [
      {
        query: LIST_DOCTOR_FEES,
        variables: Object.assign(
          {
            offset: (page - 1) * 20 || 0,
            limit: 20,
            doctorId,
            status,
          },
          dateFrom && { dateFrom },
          dateTo && { dateTo }
        ),
      },
    ],
    onError(err) {
      Alert.error(err.message);
    },
  });
  const [gatherDoctorFees] = useMutation(GATHER_DOCTOR_FEES, {
    onCompleted() {
      Alert.success('The fees has been gathered Successfully');
    },
    refetchQueries: [
      {
        query: LIST_DOCTOR_FEES,
        variables: Object.assign(
          {
            offset: (page - 1) * 20 || 0,
            limit: 20,
            doctorId,
            status,
          },
          dateFrom && { dateFrom },
          dateTo && { dateTo }
        ),
      },
    ],
    onError(err) {
      Alert.error(err.message);
    },
  });
  /* compound */

  return useMemo(
    () => ({
      users,
      doctors,
      addSessionToDoctor: doctorSession =>
        addSessionToDoctor({ variables: { doctorSession: doctorSession } }),
      deleteSessionToDoctor,
      doctorSessionsDefinations,
      doctorFeesTransactions,
      totalDoctorFees,
      doctorFeesCount,
      editDoctorFees,
      gatherDoctorFees,
      addNewwDoctorFees,
    }),
    [
      users,
      doctors,
      addSessionToDoctor,
      doctorSessionsDefinations,
      deleteSessionToDoctor,
      doctorFeesTransactions,
      totalDoctorFees,
      doctorFeesCount,
      editDoctorFees,
      gatherDoctorFees,
      addNewwDoctorFees,
    ]
  );
}

export default useDoctor;
