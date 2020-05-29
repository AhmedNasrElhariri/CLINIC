import React from 'react';
import { Uploader, Loader, Alert, Icon } from 'rsuite';
import { useMutation } from '@apollo/react-hooks';
import { SINGLE_UPLOAD } from 'apollo-client/queries';
import { Div } from 'components';

const styles = {
  width: 150,
  height: 150,
  margin: 0,
  marginRight: 10,
};

function LogoUpload({ onUpload, url }) {
  const [uploadFileMutation, { loading }] = useMutation(SINGLE_UPLOAD, {
    onCompleted({ singleUpload }) {
      onUpload(singleUpload);
      Alert.success('Uploaded successfully');
    },
    onError() {
      Alert.error('Upload failed');
    },
  });

  return (
    <Div display="flex">
      <Uploader
        autoUpload={false}
        fileListVisible={false}
        listType="picture"
        onChange={files => {
          uploadFileMutation({ variables: { file: files[0].blobFile } });
        }}
      >
        <button style={styles}>
          {loading && <Loader backdrop center />}
          <Icon icon="plus-square-o" size="5x" />
        </button>
      </Uploader>
      {url && <Div as="img" src={url} width={150} height={150} alt=""></Div>}
    </Div>
  );
}

export default LogoUpload;
