import React from 'react';
import { useMutation } from '@apollo/client';
import { Form, Alert } from 'rsuite';

import { CRModal } from 'components';
import AddLabImages from '../add-lab-images';
import { ADD_LAB_DOCS } from 'apollo-client/queries';
import { CRTextInput } from 'components/widgets';

const AddLabDocs = ({ visible, onClose, formValue, setFormValue }) => {
  const [addLabDocs] = useMutation(ADD_LAB_DOCS, {
    onCompleted: () => {
      Alert.success('Lab Document has been uploaded successfully');
    },
  });
  return (
    <CRModal
      header="Update Lab Docs"
      show={visible}
      onOk={() => {
        const { labId, value, files } = formValue;
        addLabDocs({
          variables: {
            documentLab: {
              labId: labId,
              value: value,
              files: files,
            },
          },
        });
      }}
      onCancel={onClose}
      onHide={onClose}
    >
      <Form fluid formValue={formValue} onChange={setFormValue}>
        <CRTextInput virtualized={false} label="Value" name="value" block />
        <AddLabImages
          name="files"
          onChange={setFormValue}
          value={formValue.files}
        />
      </Form>
    </CRModal>
  );
};

AddLabDocs.propTypes = {};

export default AddLabDocs;
