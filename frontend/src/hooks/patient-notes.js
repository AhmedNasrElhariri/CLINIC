import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { LIST_PATIENT_NOTES } from 'apollo-client/queries';
import * as R from 'ramda';
const usePatientNotes = ({ dateFrom, dateTo, patientId }) => {
  const { data } = useQuery(LIST_PATIENT_NOTES, {
    // variables: Object.assign(
    //   {
    //     patientId,
    //   },
    //   dateFrom && { dateFrom: dateFrom },
    //   dateTo && { dateTo: dateTo }
    // ),
    variables: { input: { dateFrom, dateTo, patientId } },
  });
  const patientNotes = R.propOr([], 'patientNotes')(data);
  return useMemo(
    () => ({
      patientNotes,
    }),
    [patientNotes]
  );
};

export default usePatientNotes;
