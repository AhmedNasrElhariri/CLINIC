import React, { useCallback, useMemo } from 'react';
import ListImageDocs from './list-images';
import UpdateImage from './edit-image';
import { formatDate } from 'utils/date';
import * as R from 'ramda';
import useFrom from 'hooks/form';
import { GET_PATIENT_IMAGEDOC } from 'apollo-client/queries';
import { useQuery } from '@apollo/client';
import useModal from 'hooks/use-model';
const initValue = { imageId: '', imageDefinition: {}, value: '', files: [] };
const PendingImages = ({ patient }) => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useFrom({
    initValue,
  });
  const status = 'pending';
  const patientId = patient.id;
  const { data } = useQuery(GET_PATIENT_IMAGEDOC, {
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
