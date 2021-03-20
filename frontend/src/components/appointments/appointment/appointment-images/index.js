import React, { useState, useEffect, useCallback } from 'react';

import { Div } from 'components';
import useImagesDefinition from 'hooks/fetch-images-definition';
import ImageRow from './image-row';

const AppointmentImages = ({ selectedImages, onChange }) => {
  const { imagesDefinition } = useImagesDefinition();
  const [formValue, setFormValue] = useState([]);

  useEffect(() => {
    const newFormValue = imagesDefinition.map(l => ({
      ...l,
      required: selectedImages.includes(l.id),
    }));
    setFormValue(newFormValue);
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
