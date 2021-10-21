import React, { useState, useEffect, useCallback } from 'react';

import { Div } from 'components';
import { useImageDefinition } from 'hooks';
import ImageRow from './image-row';

const AppointmentImages = ({ selectedImages, onChange, categoryId }) => {
  
  const { imagesDefinition } = useImageDefinition({ categoryId });
  const [formValue, setFormValue] = useState([]);

  useEffect(() => {
    const updatedImages = imagesDefinition.map((l, idx) => ({
      ...l,
      required: selectedImages.includes(l.id),
    }));
    const filteredImages = updatedImages.filter(i => i.required == true);
    setFormValue(filteredImages);
  }, [imagesDefinition, selectedImages]);

  const handleOnClick = useCallback(
    ({ id, required }) => {
      const newState = !required;
      const selectedImageIds = formValue
        .filter(lf => (lf.id === id ? newState : lf.required))
        .map(lf => lf.id);

      onChange(selectedImageIds);
    },
    [formValue, onChange]
  );
  return (
    <Div>
      {formValue.map((img, idx) => (
        <ImageRow key={idx} image={img} onClick={() => handleOnClick(img)} />
      ))}
    </Div>
  );
};

export default AppointmentImages;
