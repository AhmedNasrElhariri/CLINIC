import React, { useMemo } from 'react';
import { Uploader, Loader, Icon, Alert } from 'rsuite';
import * as R from 'ramda';
import { useMutation } from '@apollo/client';

import { Div, CRCard, H6, CRButton, Img } from 'components';
import useGlobalState from 'state';
import { SET_AVATAR } from 'apollo-client/queries';

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

const ChangePassword = () => {
  const [uploading, setUploading] = React.useState(false);
  const [url, setURL] = React.useState(null);
  const [fileInfo, setFileInfo] = React.useState(null);
  const [setAvatar] = useMutation(SET_AVATAR, {
    onCompleted() {
      Alert.success('Avatar has been set successfully');
      setUser({ ...user, avatar: url });
    },
  });
  const [user, setUser] = useGlobalState('user');

  const avatar = useMemo(() => fileInfo || R.prop('avatar')(user), [
    fileInfo,
    user,
  ]);

  return (
    <Div mb={20}>
      <CRCard borderless>
        <Div mb={30} display="flex" justifyContent="space-between">
          <H6 fontWeight="bold">Change Profile Picture</H6>
          <CRButton
            small
            primary
            onClick={() =>
              setAvatar({
                variables: {
                  url,
                },
              })
            }
          >
            Save
          </CRButton>
        </Div>

        <Uploader
          fileListVisible={false}
          listType="picture"
          action="/upload"
          onSuccess={(response, file) => {
            setUploading(false);
            setURL(response[0].url);
            previewFile(file.blobFile, value => {
              setFileInfo(value);
            });
            Alert.success('Uploaded successfully');
          }}
        >
          <button>
            {uploading && <Loader backdrop center />}
            {avatar ? (
              <Img
                src={avatar}
                width="100%"
                height="100%"
                alt="avatar"
                borderRadius="50%"
              />
            ) : (
              <Icon icon="avatar" size="5x" />
            )}
          </button>
        </Uploader>
      </CRCard>
    </Div>
  );
};

export default ChangePassword;
