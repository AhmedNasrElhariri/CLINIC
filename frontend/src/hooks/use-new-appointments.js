import { useMemo, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Alert } from 'rsuite';
import * as R from 'ramda';

import { ACTIONS } from 'utils/constants';
import { CREATE_APPOINTMENT, LIST_BRANCHES_TREE } from 'apollo-client/queries';
import useAppointments from './use-appointments';
import usePatients from './use-patients';

const initialValues = {
  type: 'Examination',
  patientId: null,
  branchId: null,
  specialtyId: null,
  userId: null,
  date: new Date(),
  time: null,
};

const useNewAppointments = ({ onCreate } = {}) => {
  const [formValue, setFormValue] = useState(initialValues);

  const { appointments } = useAppointments();
  const { patients } = usePatients();
  // useFetchPatient(LIST_PATIENTS);

  const { data } = useQuery(LIST_BRANCHES_TREE, {
    variables: { action: ACTIONS.Create_Appointment },
  });

  const [createAppointment] = useMutation(CREATE_APPOINTMENT, {
    onCompleted: ({ createAppointment }) => {
      setFormValue(initialValues);
      Alert.success('Reservation Created Successfully');
      // updateAppointments(
      //   sortAppointmentsByDate([createAppointment, ...appointments])
      // );
      // onHide();
      onCreate && onCreate();
    },
    onError: ({ message }) => Alert.error(message),
  });

  const branches = R.propOr([], 'listBranchesTree')(data);

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
      createAppointment: appointment =>
        createAppointment({ variables: { appointment } }),
    }),
    [
      appointments,
      branches,
      createAppointment,
      doctors,
      formValue,
      patients,
      specialties,
    ]
  );
};

export default useNewAppointments;