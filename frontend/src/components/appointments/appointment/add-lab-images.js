import React, { useState } from 'react';
import styled from 'styled-components';
import { Uploader, FormControl } from 'rsuite';

const UploaderStyled = styled(Uploader)`
  & .rs-uploader-file-item,
  & .rs-uploader-trigger-btn {
    width: 150px;
    height: 150px;
    line-height: 150px !important;
  }
  & .rs-uploader-file-item-preview {
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  line-height: 100px !important;
`;

const LabFormInput = ({ value, onChange }) => {
  const [images, setImages] = useState([]);
  const onUpload = resp => {
    const newImages = [...value, resp];
    onChange(newImages);
  };
  return (
    <UploaderStyled
      multiple
      draggable
      listType="picture"
      fileList={images}
      action={'/upload'}
      onChange={setImages}
      onSuccess={onUpload}
    >
      <Content>Click or Drag</Content>
    </UploaderStyled>
  );
};

const AddLabImages = props => {
  return <FormControl {...props} accepter={LabFormInput}></FormControl>;
};

AddLabImages.propTypes = {};

export default AddLabImages;
