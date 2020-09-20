import React from 'react';
import { Uploader, Loader, Alert, Icon } from 'rsuite';
import { Div, Img } from 'components';
import { BadgtStyled } from './style';
import { CameraIcon } from 'components/icons';
import useUpload from 'hooks/upload';

const styles = {
  width: '100%',
  height: '100%',
  margin: 0,
};

const UploadIcon = () => (
  <BadgtStyled>
    <CameraIcon />
  </BadgtStyled>
);

function LogoUpload({ onUpload, url }) {
  const { upload, loading } = useUpload({
    onCompleted(res) {
      onUpload(res);
      Alert.success('Uploaded successfully');
    },
    onError() {
      Alert.error('Upload failed');
    },
  });

  return (
    <Div>
      <label className="rs-control-label">Upload</label>
      <Div display="flex" position="relative">
        <Uploader
          autoUpload={false}
          fileListVisible={false}
          listType="picture"
          onChange={files => {
            upload(files[0].blobFile);
          }}
        >
          <Div minWidth={150} minHeight={150}>
            <Img src={url} alt="" />
            {url ? (
              <Img src={url} alt="" />
            ) : (
              <button style={styles}>
                {loading && <Loader backdrop center />}
                <Icon icon="plus-square-o" size="5x" />
              </button>
            )}
          </Div>
        </Uploader>
        <UploadIcon />
      </Div>
    </Div>
  );
}

export default LogoUpload;
