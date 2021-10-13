import { useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import { GET_USER_PATIENT_FIELD } from 'apollo-client/queries';
import client from 'apollo-client/client';

function usePatientView({} = {}) {
  const { data: patientFieldData } = useQuery(GET_USER_PATIENT_FIELD);
  const userPatientFields = useMemo(
    () => R.propOr([], 'getUserPatientFields')(patientFieldData),
    [patientFieldData]
  );
  return useMemo(() => ({ userPatientFields }), [userPatientFields]);
}

export default usePatientView;
