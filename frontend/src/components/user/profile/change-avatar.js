import React, { useMemo } from 'react';
import { Uploader, Loader, Icon, Alert } from 'rsuite';
import * as R from 'ramda';
import { useMutation } from '@apollo/client';

import { Div, CRCard, H6, CRButton } from 'components';
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
  const [setAvatar] = useMutation(SET_AVATAR);
  const [user, setUser] = useGlobalState('user');

  const avatar = useMemo(() => R.propOr(fileInfo, 'avatar')(user), [
    fileInfo,
    user,
  ]);

  console.log(avatar);

  return (
    <Div mb={20}>
      <CRCard borderless>
        <Div mb={30} display="flex" justifyContent="space-between">
          <H6 fontWeight="bold">Change Avatar</H6>
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
            console.log(file);
            setUploading(false);
            setURL(response.url);
            previewFile(file.blobFile, value => {
              setFileInfo(value);
            });
            Alert.success('Uploaded successfully');
          }}
        >
          <button>
            {uploading && <Loader backdrop center />}
            {avatar ? (
              <img src={avatar} width="100%" height="100%" alt="avatar" />
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
