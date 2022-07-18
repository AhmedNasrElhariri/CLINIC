import React, { useState, useCallback } from 'react';
import ListImageDocs from './list-image-docs';
import { Form } from 'rsuite';
import { usePatientImages, useModal } from 'hooks';
import { CRSelectInput } from 'components/widgets';
import DeleteImage from '../history-labs/delete-image';
import * as R from 'ramda';

const initialValue = {
  imageId: '',
  photoId: null,
};
const HistoryImages = ({ patient }) => {
  const { visible, open, close } = useModal();
  const [header, setHeader] = useState('');
  const [formValue, setFormValue] = useState(initialValue);
  const { historyImages, deleteImagePhoto } = usePatientImages({
    patientId: patient.id,
    onDelete: close,
  });
  const ImageDocs = historyImages.map(element => {
    return {
      name: element.imageDefinition.name,
      id: element.id,
    };
  });
  const handleDeleteImage = useCallback(
    data => {
      const image = R.pick(['id'])(data);
      setHeader('Delete Image');
      setFormValue({ ...formValue, photoId: image.id });
      open();
    },
    [open, setFormValue, setHeader, formValue]
  );
  const handleAdd = useCallback(() => {
    deleteImagePhoto({
      variables: {
        id: formValue.photoId,
      },
    });
  }, [deleteImagePhoto, formValue]);

  return (
    <>
      <Form formValue={formValue} onChange={setFormValue}>
        <CRSelectInput
          virtualized={false}
          name="imageId"
          data={ImageDocs}
          block
          style={{ marginTop: '10px', width: '310px', marginLeft: '0px' }}
        />
      </Form>
      <ListImageDocs
        imageId={formValue.imageId}
        images={historyImages}
        onDelete={handleDeleteImage}
      />
      <DeleteImage
        visible={visible}
        formValue={formValue}
        onOk={handleAdd}
        onClose={close}
        header={header}
      />
    </>
  );
};

HistoryImages.propTypes = {};

export default HistoryImages;
