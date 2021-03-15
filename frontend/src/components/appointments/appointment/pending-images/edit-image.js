import React from 'react';
import { useMutation } from '@apollo/client';
import { Form, Alert, SelectPicker } from 'rsuite';
import { CRModal } from 'components';
import AddLabImages from '../add-lab-images';
import { ADD_LAB_DOCS } from 'apollo-client/queries';
import { CRTextInput } from 'components/widgets';

const AddImageDocs = ({
  visible,
  onClose,
  formValue,
  setFormValue,
  images,
  selectedImage,
}) => {
  const [addLabDocs] = useMutation(ADD_LAB_DOCS, {
    onCompleted: () => {
      Alert.success('Image Document has been uploaded successfully');
    },
  });
  return (
    <CRModal
      header="Update Image Docs"
      show={visible}
      onOk={() => {
        const { labId, value, files } = formValue;
        addLabDocs({
          variables: {
            documentImage: {
              imageId: labId,
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
        <SelectPicker
          virtualized={false}
          name="image"
          value={selectedImage}
          data={images}
          block
          style={{ width: '464px' }}
        />
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

AddImageDocs.propTypes = {};

export default AddImageDocs;
