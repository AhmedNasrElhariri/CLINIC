import React, { useState, useCallback } from 'react';

import ListImageDocs from './list-images';
import InsertImageResult from './insert-image';

import { useModal, usePatientImages } from 'hooks';

const PendingImages = ({ patient }) => {
  const { visible, open, close } = useModal();
  const [selectedImage, setSelectedImage] = useState({});
  
  const { pendingImages, insertImageResult } = usePatientImages({
    patientId: patient.id,
    onInsert: close,
  });
  const handleClickEdit = useCallback(
    data => {
      setSelectedImage(data);
      open();
    },
    [open, setSelectedImage]
  );
  return (
    <>
      <ListImageDocs images={pendingImages} onEdit={handleClickEdit} />
      <InsertImageResult
        visible={visible}
        onClose={close}
        images={pendingImages}
        onCreate={insertImageResult}
        id={selectedImage.id}
      />
    </>
  );
};

PendingImages.propTypes = {};

export default PendingImages;
