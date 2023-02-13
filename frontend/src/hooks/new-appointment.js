import { useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Alert } from 'rsuite';
import * as R from 'ramda';
import * as moment from 'moment';
import { ACTIONS, APPT_STATUS } from 'utils/constants';
import { Schema } from 'rsuite';
import {
  CREATE_APPOINTMENT,
  LIST_APPOINTMENTS,
  LIST_BRANCHES_TREE,
  LIST_TODAY_APPOINTMENTS,
  APPOINTMENTS_DAY_COUNT,
  LIST_BRANCHES,
} from 'apollo-client/queries';
import { useForm } from 'hooks';
import usePatients from './patients';
import { useAppSelector } from 'redux-store/hooks';
import {
  selectSelectedBranch,
  selectSelectedSpecialty,
  selectSelectedDoctor,
} from 'features/root/rootSlice';

const initialValues = {
  type: 'Session',
  patientId: null,
  branchId: null,
  session: {},
  specialtyId: null,
  userId: null,
  date: new Date(),
  time: null,
  waiting: false,
  appointmentId: null,
  referedDoctor: false,
};
const { StringType, DateType } = Schema.Types;
const model = Schema.Model({
  type: StringType().isRequired('appointment type is required'),
  date: DateType().isRequired('date is required'),
});

const useNewAppointment = ({
  onCreate,
  date,
  page = 1,
  status = APPT_STATUS.SCHEDULED,
} = {}) => {
  const branchId = useAppSelector(selectSelectedBranch);
  const selectedSpecialty = useAppSelector(selectSelectedSpecialty);
  const selectedDoctor = useAppSelector(selectSelectedDoctor);
  const { formValue, setFormValue, checkResult, validate, show, setShow } =
    useForm({
      initValue: initialValues,
      model,
    });
  const { patientsSummary: patients } = usePatients();

  const { data } = useQuery(LIST_BRANCHES_TREE, {
    variables: { action: ACTIONS.Create_Appointment },
  });
  const { data: organizationBranchesData } = useQuery(LIST_BRANCHES);

  const [createAppointment, { loading }] = useMutation(CREATE_APPOINTMENT, {
    onCompleted: () => {
      setFormValue(initialValues);
      setShow(false);
      Alert.success('Appointment Created Successfully');
      onCreate && onCreate();
    },
    refetchQueries: [
      {
        query: LIST_APPOINTMENTS,
        variables: { offset: 0, limit: 20 },
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
      checkResult,
      validate,
      show,
      setShow,
      loading,
      organizationBranches,
      createAppointment: appointment =>
        createAppointment({ variables: { appointment } }),
    }),
    [
      branches,
      organizationBranches,
      createAppointment,
      doctors,
      formValue,
      setFormValue,
      checkResult,
      validate,
      show,
      setShow,
      patients,
      specialties,
      loading,
    ]
  );
};

export default useNewAppointment;
