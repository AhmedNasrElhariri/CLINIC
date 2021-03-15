import React, { useState } from 'react';
import styled from 'styled-components';
import { Uploader, FormControl, Icon } from 'rsuite';

const UploaderStyled = styled(Uploader)`
  & .rs-uploader-file-item,
  & .rs-uploader-trigger-btn {
    width: 255px;
    height: 255px;
  }
  & .rs-uploader-file-item-preview {
    height: 100%;
    object-fit: cover;
  }
`;

const StyledContainer = styled.div``;

const Content = styled.p`
  margin: ${props => props.margin};
  font-family: SegoeUI;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: #a6abab;
  display: flex;
  white-space: initial;
`;
const Focus = styled.div`
  color: #283148;
`;

const LabFormInput = ({ value, onChange }) => {
  const [images, setImages] = useState([]);
  const onUpload = resp => {
    const newImages = value.concat(resp);
    onChange(newImages);
  };
  return (
    <UploaderStyled
      multiple
      draggable
      listType="picture"
      fileList={images}
      action="/upload"
      onChange={setImages}
      onSuccess={onUpload}
    >
      <StyledContainer>
        <Icon
          icon="cloud-upload"
          style={{
            margin: '96.5px 112px 15px 112px',
            width: '30px',
          }}
        ></Icon>
        <Content margin='0px 59px 51px 59px'>
          Drop files here or<Focus> browse</Focus>
        </Content>
        <Content margin='0px 59px 14px 59px'>Use high quality .jpg files less than 3 MB</Content>
      </StyledContainer>
    </UploaderStyled>
  );
};

const AddLabImages = props => {
  return <FormControl {...props} accepter={LabFormInput}></FormControl>;
};

AddLabImages.propTypes = {};

export default AddLabImages;
