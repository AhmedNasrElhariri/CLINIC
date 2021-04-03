import React from 'react';
import { Form } from 'rsuite';

import { Div, Img, CRTextArea } from 'components';

const ImgBox = ({ url, comment, onCommentChange, ...props }) => {
  return (
    <Div>
      <Img src={url} maxHeight={160} width="100%" />
      <Form>
        <CRTextArea
          value={comment}
          onChange={onCommentChange}
          placeholder="comment"
          rows={4}
        />
      </Form>
    </Div>
  );
};

ImgBox.defaultProps = {};

export default ImgBox;
