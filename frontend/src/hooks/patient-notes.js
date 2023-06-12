import { useQuery, useMutation } from '@apollo/client';
import { useMemo } from 'react';
import {
  LIST_PATIENT_NOTES,
  UPDATE_BUSINESS_NOTES,
  DELETE_BUSINESS_NOTES,
} from 'apollo-client/queries';
import * as R from 'ramda';
import { Alert } from 'rsuite';

const usePatientNotes = ({ dateFrom, dateTo, patientId }) => {
  const { data, refetch: refetchNotes } = useQuery(LIST_PATIENT_NOTES, {
    variables: { input: { dateFrom, dateTo, patientId } },
  });
  const patientNotes = R.propOr([], 'patientNotes')(data);

  const [updateNotes] = useMutation(UPDATE_BUSINESS_NOTES, {
    onCompleted: () => {
      Alert.success('Business Notes Added Successfully');
      refetchNotes();
    },
  });
  const [deleteNotes] = useMutation(DELETE_BUSINESS_NOTES, {
    onCompleted: () => {
      Alert.success('Business Notes Deleted Successfully');
      refetchNotes();
    },
  });
  return useMemo(
    () => ({
      patientNotes,
      updateNotes,
      deleteNotes,
    }),
    [patientNotes, updateNotes, deleteNotes]
  );
};

export default usePatientNotes;
