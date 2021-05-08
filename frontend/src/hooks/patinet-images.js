import { useEffect, useMemo } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Alert } from 'rsuite';
import * as R from 'ramda';

import {
  LIST_PATIENT_IMAGES,
  INSRET_IMAGE_RESULT,
} from 'apollo-client/queries';
import { IMAGE_STATUS } from 'utils/constants';

function usePatientImages({ patientId, onInsert } = {}) {
  const [getPendingImages, { data, called, refetch }] = useLazyQuery(
    LIST_PATIENT_IMAGES,
    {
      variables: { patientId },
    }
  );
  console.log(getPendingImages);
  const images = useMemo(
    () =>
      R.pipe(
        R.propOr([], 'patientImages'),
        R.map(l => ({ ...l, ...l.imageDefinition }))
      )(data),
    [data]
  );

  const pendingImages = useMemo(
    () => R.filter(R.propEq('status', IMAGE_STATUS.PENDING))(images),
    [images]
  );
  console.log(pendingImages);
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
    }),
    [historyImages, insertImageResult, pendingImages]
  );
}

export default usePatientImages;
