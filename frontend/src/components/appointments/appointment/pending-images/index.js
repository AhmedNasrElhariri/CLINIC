import React, { useCallback, useMemo } from 'react';
import * as R from 'ramda';

import ListImageDocs from './list-images';
import UpdateImage from './edit-image';
import { formatDate } from 'utils/date';

import { useForm, useModal } from 'hooks';
import { LIST_PATIENT_IMAGES } from 'apollo-client/queries';
import { useQuery } from '@apollo/client';

const initValue = { imageId: '', imageDefinition: {}, value: '', files: [] };

const PendingImages = ({ patient }) => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  const status = 'pending';
  const patientId = patient.id;
  const { data } = useQuery(LIST_PATIENT_IMAGES, {
    variables: { status: status, patientId: patientId },
  });

  const patientImageDocs = useMemo(
    () => R.propOr([], 'patientImageDocs')(data),
    [data]
  );

  const images = useMemo(
    () =>
      patientImageDocs.map(element => {
        return {
          name: element.imageDefinition.name,
          date: formatDate(element.requiredDate),
          id: element.id,
        };
      }),
    [patientImageDocs]
  );
  const selectorImages = useMemo(
    () =>
      patientImageDocs.map(element => {
        return {
          label: element.imageDefinition.name,
          value: element.id,
        };
      }),
    [patientImageDocs]
  );
  const handleClickEdit = useCallback(
    data => {
      const id = data.id;
      const name = data.name;
      const image = { imageId: id, name: name, value: '', files: [] };
      setType('edit');
      setFormValue(image);
      open();
    },
    [open, setFormValue, setType]
  );
  return (
    <>
      <ListImageDocs images={images} onEdit={handleClickEdit} />
      <UpdateImage
        visible={visible}
        onClose={close}
        formValue={formValue}
        setFormValue={setFormValue}
        type={type}
        images={selectorImages}
        selectedImage={formValue.imageId}
      />
    </>
  );
};

PendingImages.propTypes = {};

export default PendingImages;
