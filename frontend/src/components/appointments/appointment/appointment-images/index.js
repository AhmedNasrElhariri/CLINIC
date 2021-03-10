import React from 'react';

import { Div } from 'components';
import useImagesDefinition from 'hooks/fetch-images-definition';
import ImageRow from './image-row';
const Lab = ({ formValue, onChange }) => {
  const { imagesDefinition } = useImagesDefinition();
  return (
    <Div>
      {imagesDefinition.map((i, idx) => (
        <ImageRow
          key={idx}
          image={i}
          imagesValue={formValue}
          onChange={onChange}
        />
      ))}
    </Div>
  );
};

export default Lab;
