import { useEffect, useMemo } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Alert } from 'rsuite';
import * as R from 'ramda';

import {
  LIST_PATIENT_IMAGES,
  INSRET_IMAGE_RESULT,
  DELETE_LAB_PHOTO,
} from 'apollo-client/queries';
import { IMAGE_STATUS } from 'utils/constants';

function usePatientImages({ patientId, onInsert, onDelete } = {}) {
  const [getPendingImages, { data, called, refetch }] = useLazyQuery(
    LIST_PATIENT_IMAGES,
    {
      variables: { patientId },
    }
  );
  const images = useMemo(
    () =>
      R.pipe(
        R.propOr([], 'patientImages'),
        R.map(l => ({ ...l, ...l.imageDefinition }))
      )(data),
    [data]
  );

  const pendingImages = useMemo(
    () =>
      R.filter(R.propOr('status', IMAGE_STATUS.PENDING || IMAGE_STATUS.DRAFT))(
        images
      ),
    [images]
  );

  const historyImages = useMemo(
    () => R.filter(R.propEq('status', IMAGE_STATUS.COMPLETED))(images),
    [images]
  );
  const [insertImageResult] = useMutation(INSRET_IMAGE_RESULT, {
    onCompleted: () => {
      Alert.success('Image Document has been uploaded successfully');
      onInsert && onInsert();
    },
  });
  const [deleteImagePhoto] = useMutation(DELETE_LAB_PHOTO, {
    onCompleted: () => {
      Alert.success('Lab Document has been Deleted successfully');
      onDelete && onDelete();
      refetch();
    },
  });
  useEffect(() => {
    if (patientId) {
      getPendingImages();
    }
  }, [called, getPendingImages, patientId]);

  return useMemo(
    () => ({
      pendingImages,
      historyImages,
      insertImageResult: image => insertImageResult({ variables: { image } }),
      deleteImagePhoto,
    }),
    [historyImages, insertImageResult, pendingImages, deleteImagePhoto]
  );
}

export default usePatientImages;
