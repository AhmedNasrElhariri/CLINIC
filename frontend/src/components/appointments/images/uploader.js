import React from 'react';
import { Icon, Uploader, Alert, Loader } from 'rsuite';

import { useUpload } from 'hooks';
import { Div, H6 } from 'components';

const CRUploader = ({ onUpload }) => {
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
    <Uploader
      multiple
      draggable
      autoUpload={false}
      fileListVisible={false}
      onChange={files => {
        upload(files.map(f => f.blobFile));
      }}
    >
      <button style={{ width: '100%' }}>
        {loading ? (
          <Loader backdrop center />
        ) : (
          <Div
            height={200}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Div>
              <Icon icon="plus-square-o" style={{ fontSize: 50 }} />
              <H6 mt={3}>Click or Drag files to this area to upload</H6>
            </Div>
          </Div>
        )}
      </button>
    </Uploader>
  );
};

CRUploader.defaultProps = {};

export default CRUploader;
