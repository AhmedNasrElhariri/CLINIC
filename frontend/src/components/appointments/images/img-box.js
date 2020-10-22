import React, { useMemo } from 'react';
import { Tooltip, Whisper, Form } from 'rsuite';

import { Div, Img, CRTextInput } from 'components';
import IconsBar from './icons-bar';
import { Comment } from './style';

const ImgBox = ({ url, comment, onChangeComment, ...props }) => {
  const { editable, disabled } = props;
  const tooltip = useMemo(() => {
    return <Tooltip>{comment}</Tooltip>;
  }, [comment]);
  return (
    <Div mr={5} mb={editable ? '80px' : 4} position="relative">
      <Whisper
        placement="top"
        speaker={comment ? tooltip : <Div></Div>}
        trigger="hover"
      >
        <Div
          width={180}
          style={{
            background: '#e2e2e2',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Div width={160}>
            <IconsBar {...props} />
            <Img
              src={url}
              width={160}
              height={160}
              opacity={disabled ? 0.1 : 1}
              style={{ transform: editable ? 'none' : 'scale(0.9)' }}
            />
            {!editable && <Comment>{comment}</Comment>}
          </Div>
        </Div>
      </Whisper>
      <Div
        width={350}
        position="absolute"
        top={200}
        left={0}
        display={editable ? 'block' : 'none'}
      >
        <Form>
          <CRTextInput
            value={comment || ''}
            onChange={onChangeComment}
            placeholder="comment"
          />
        </Form>
      </Div>
    </Div>
  );
};

ImgBox.defaultProps = {};

export default ImgBox;
