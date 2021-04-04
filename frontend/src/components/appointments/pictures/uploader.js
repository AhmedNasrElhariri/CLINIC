import React from 'react';
import { Icon, Uploader, Alert, Loader } from 'rsuite';

import { useUpload } from 'hooks';
import { Div, H7 } from 'components';

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

  const h = res => {
    console.log(res);
  };

  return (
    <Uploader
      multiple
      draggable
      autoUpload={false}
      fileListVisible={false}
      onSuccess={h}
      fileList={[]}
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
              <H7 mt={3} fontWeigh={400}>
                Click or Drag files here!
              </H7>
            </Div>
          </Div>
        )}
      </button>
    </Uploader>
  );
};

CRUploader.defaultProps = {};

export default CRUploader;
