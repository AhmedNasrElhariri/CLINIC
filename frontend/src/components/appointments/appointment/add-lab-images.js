import React from 'react';
import styled from 'styled-components';
import { Uploader, FormControl, Icon } from 'rsuite';
import * as R from 'ramda';

import { Div } from 'components';
import { CRLabel } from 'components/widgets';

const UploaderStyled = styled(Uploader)`
  & .rs-uploader-file-item,
  & .rs-uploader-trigger-btn {
    border-radius: 0px;
  }
  & .rs-uploader-file-item-preview {
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
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

const FileStyled = styled.div`
  height: 35px;
  background-color: #eef1f1;
  padding: 7px;
  margin-bottom: 4px;
  font-family: SegoeUI;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: left;
  color: #1b253a;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LabFormInput = ({ value, onChange }) => {
  const onUpload = resp => {
    const newImages = value.concat(resp);
    onChange(newImages);  
  };

  const handleRemove = idx => {
    const newImages = R.remove(idx, 1)(value);
    onChange(newImages);
  };

  return (
    <Div mt={3}>
      <CRLabel>Images</CRLabel>
      <UploaderStyled
        multiple
        draggable
        action="/upload"
        onSuccess={onUpload}
        fileListVisible={false}
        onRemove={handleRemove}
      >
        <Div>
          <Div height="120px" display="flex" alignItems="center">
            <Div
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height={80}
              alignItems="center"
              width="100%"
            >
              <Div>
                <Icon icon="cloud-upload" />
              </Div>
              <Content>
                Drop files here or<Focus>&nbsp; browse</Focus>
              </Content>
              <Content>Use high quality .jpg files less than 3 MB</Content>
            </Div>
          </Div>
        </Div>
      </UploaderStyled>
      <Div mt={1}>
        {value.map(({ filename}, index) => (
          <FileStyled key={index}>
            <span>{filename}</span>
            <Icon
              icon="close"
              onClick={() => handleRemove(index)}
              style={{ fontWeight: 900, cursor: 'pointer' }}
            />
          </FileStyled>
        ))}
      </Div>
      
    </Div>
  );
};

const AddLabImages = props => {
  return <FormControl {...props} accepter={LabFormInput}></FormControl>;
};

AddLabImages.propTypes = {};

export default AddLabImages;
