import { useMemo, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Alert } from 'rsuite';
import * as R from 'ramda';
import * as moment from 'moment';
import { ACTIONS } from 'utils/constants';
import {
  CREATE_APPOINTMENT,
  LIST_APPOINTMENTS,
  LIST_BRANCHES_TREE,
  APPOINTMENTS_DAY_COUNT,
  LIST_BRANCHES,
} from 'apollo-client/queries';
import useAppointments from './appointments';
import usePatients from './patients';

const initialValues = {
  type: 'Examination',
  patientId: null,
  branchId: null,
  sessionId: null,
  specialtyId: null,
  userId: null,
  date: new Date(),
  time: null,
  waiting: false,
};

const useNewAppointment = ({ onCreate, date } = {}) => {
  const [formValue, setFormValue] = useState(initialValues);

  const { appointments } = useAppointments();
  const { patients } = usePatients();

  const { data } = useQuery(LIST_BRANCHES_TREE, {
    variables: { action: ACTIONS.Create_Appointment },
  });
  const { data: organizationBranchesData } = useQuery(LIST_BRANCHES);

  const [createAppointment, { loading }] = useMutation(CREATE_APPOINTMENT, {
    onCompleted: () => {
      setFormValue(initialValues);
      Alert.success('Appointment Created Successfully');
      onCreate && onCreate();
    },
    refetchQueries: [
      {
        query: APPOINTMENTS_DAY_COUNT,
        variables: { date: moment(formValue.date).toDate() },
      },
      {
        query: LIST_APPOINTMENTS,
      },
    ],
    onError: ({ message }) => Alert.error(message),
  });

  const branches = R.propOr([], 'listBranchesTree')(data);
  const organizationBranches = R.propOr(
    [],
    'listBranches'
  )(organizationBranchesData);
  const specialties = useMemo(
    () =>
      R.pipe(
        R.find(R.propEq('id', formValue.branchId)),
        R.propOr([], 'specialties')
      )(branches),
    [branches, formValue.branchId]
  );

  const doctors = useMemo(
    () =>
      R.pipe(
        R.find(R.propEq('id', formValue.specialtyId)),
        R.propOr([], 'doctors')
      )(specialties),
    [formValue.specialtyId, specialties]
  );

  return useMemo(
    () => ({
      branches,
      specialties,
      patients,
      doctors,
      formValue,
      setFormValue,
      appointments,
      loading,
      organizationBranches,
      createAppointment: appointment =>
        createAppointment({ variables: { appointment } }),
    }),
    [
      appointments,
      branches,
      organizationBranches,
      createAppointment,
      doctors,
      formValue,
      patients,
      specialties,
      loading,
    ]
  );
};

export default useNewAppointment;
