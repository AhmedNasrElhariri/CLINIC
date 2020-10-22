import React, { useCallback, useState } from 'react';
import { FlexboxGrid, Form } from 'rsuite';
import * as R from 'ramda';

import { Div } from 'components';
import { CRTextInput } from 'components/widgets';
import CRUploader from './uploader';
import ImgBox from './img-box';

const Collection = ({
  images,
  caption,
  onUpload,
  onDelete,
  onChangeCaption,
  onChangeComment,
}) => {
  const [editable, setEditable] = useState(null);

  const handleOk = useCallback(() => {
    setEditable(null);
  }, []);

  const handleDelete = useCallback(
    imgId => {
      onDelete(imgId);
      setEditable(null);
    },
    [onDelete]
  );

  return (
    <Div>
      <Div mb={4}>
        <Form>
          <CRTextInput
            value={caption}
            onChange={onChangeCaption}
            placeholder="Caption"
          />
        </Form>
      </Div>
      <FlexboxGrid>
        {images.map((img, idx) => (
          <ImgBox
            key={idx}
            {...img}
            editable={editable === idx}
            disabled={!R.isNil(editable) && editable !== idx}
            onEdit={() => setEditable(idx)}
            onOk={handleOk}
            onDelete={() => handleDelete(idx)}
            onChangeComment={comment => onChangeComment(comment, idx)}
          />
        ))}
        <CRUploader onUpload={onUpload} />
      </FlexboxGrid>
    </Div>
  );
};

Collection.defaultProps = {
  images: [],
};

export default Collection;
