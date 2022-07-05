import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';
import {
  ADD_FACE_OPERATION,
  LIST_FACE_PARTATION_OPERATIONS,
  LIST_FACE_OPERATIONS,
  DELETE_FACE_OPERATION,
} from 'apollo-client/queries';

function useFaceOperation({
  patientId,
  facePartationNumber,
  onCreate,
  onDelete,
} = {}) {
  const { data } = useQuery(LIST_FACE_PARTATION_OPERATIONS, {
    variables: {
      facePartationNumber: facePartationNumber,
      patientId: patientId,
    },
  });

  const partationFaceOperations = useMemo(
    () => R.propOr([], 'myFacePartationOperations')(data),
    [data]
  );
  const { data: faceOperationsData } = useQuery(LIST_FACE_OPERATIONS, {
    variables: {
      patientId: patientId,
    },
  });
  const faceOperations = useMemo(
    () => R.propOr([], 'myFaceOperations')(faceOperationsData),
    [faceOperationsData]
  );
  const [addFaceOperation] = useMutation(ADD_FACE_OPERATION, {
    onCompleted() {
      Alert.success('the Face Operation has been Added Successfully');
      onCreate && onCreate();
    },
    refetchQueries: [
      {
        query: LIST_FACE_OPERATIONS,
        variables: {
          facePartationNumber: facePartationNumber,
          patientId: patientId,
        },
      },
    ],
    onError() {
      Alert.error('Failed to add new Face Operation');
    },
  });
  const [deleteFaceOperation] = useMutation(DELETE_FACE_OPERATION, {
    onCompleted() {
      Alert.success('the Face Operation has been delete Successfully');
      onDelete && onDelete();
    },
    onError() {
      Alert.error('Failed to delete The Face Operation');
    },
  });

  return useMemo(
    () => ({
      addFaceOperation,
      partationFaceOperations,
      faceOperations,
      deleteFaceOperation,
    }),
    [
      addFaceOperation,
      partationFaceOperations,
      faceOperations,
      deleteFaceOperation,
    ]
  );
}

export default useFaceOperation;
