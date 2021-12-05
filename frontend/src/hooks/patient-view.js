import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import * as R from 'ramda';
import { GET_USER_PATIENT_FIELD } from 'apollo-client/queries';

function usePatientView({} = {}) {
  const { data: patientFieldData } = useQuery(GET_USER_PATIENT_FIELD);
  const userPatientFields = useMemo(
    () => R.propOr([], 'getUserPatientFields')(patientFieldData),
    [patientFieldData]
  );
  return useMemo(() => ({ userPatientFields }), [userPatientFields]);
}

export default usePatientView;
