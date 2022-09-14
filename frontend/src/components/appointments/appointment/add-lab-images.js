import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Uploader, FormControl, Icon } from 'rsuite';
import * as R from 'ramda';
import Compress from 'compress.js';
import { Div, CRButton } from 'components';
import { CRLabel } from 'components/widgets';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
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

const resizeFile = file =>
  new Promise(resolve => {
    Resizer.imageFileResizer(
      file,
      300,
      400,
      'PNG',
      80,
      0,
      uri => {
        resolve(uri);
      },
      'base64'
    );
  });
const dataURIToBlob = dataURI => {
  const splitDataURI = dataURI.split(',');
  const byteString =
    splitDataURI[0].indexOf('base64') >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0];
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
  return new Blob([ia], { type: mimeString });
};
const LabFormInput = ({ value, onChange }) => {
  // const compress = new Compress();
  // const onUpload = resp => {
  //   const newRes = resizeImageFn(resp);
  //   const newImages = valueB.concat(newRes);
  //   onChange(newImages);
  // };

  const handleRemove = idx => {
    const newImages = R.remove(idx, 1)(value);
    onChange(newImages);
  };

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('');

  const saveFile = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async e => {
    const formData = new FormData();
    const image = await resizeFile(file);
    const newFile = dataURIToBlob(image);
    const newFile2 = new File([newFile], fileName);
    formData.append('file', newFile2);

    try {
      const res = await axios.post('/upload', formData);
      const newImages = value.concat(res);
      onChange(newImages);
    } catch (ex) {
    }
  };
  return (
    <Div mt={3}>
      {/* <CRLabel>Images</CRLabel>
      <UploaderStyled
        value={value}
        autoUpload={false}
        onChange={handleChange}
        // ref={uploaderRef}
        multiple
        draggable
        action="/upload"
        // onSuccess={onUpload}
        fileListVisible={false}
        onRemove={handleRemove}
        // onUpload={beforeUpload}
        // onChange={uploading}
      > */}
      {/* <Div>
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
      </UploaderStyled> */}
      {/* <CRButton disabled={!value.length} onClick={handleUpload}>
        Start Upload
      </CRButton> */}
      {/* <input onChange={onChange} type="file" accept="uploads/*" ref={uploaderRef}/> */}
      <div className="App">
        <input type="file" onChange={saveFile} accept="image/*,.pdf" />
        <button onClick={uploadFile}>Upload</button>
      </div>
      <Div mt={1}>
        {value.map(({ data }, index) => (
          <FileStyled key={index}>
            <span>{data[0].filename}</span>
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
