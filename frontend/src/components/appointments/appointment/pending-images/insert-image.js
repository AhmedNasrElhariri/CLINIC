import React, { useEffect } from 'react';
import { Form } from 'rsuite';

import { CRModal, CRTextInput } from 'components';
import AddImageImages from '../add-lab-images';
import { CRSelectInput } from 'components/widgets';
import { useForm } from 'hooks';

const InsertImageResult = ({ visible, onClose, onCreate, id, images }) => {
  const { formValue, setFormValue, updateProp } = useForm({
    initValue: {
      id,
      value: '',
      documents: [],
    },
  });
  console.log(formValue,'FFF');
  useEffect(() => {
    updateProp('id', id);
  }, [id, updateProp]);
  return (
    <CRModal
      header="Update Image Docs"
      show={visible}
      onOk={() => {
        onCreate({
          ...formValue,
          documents: formValue.documents.map(l => l.data[0].id),
        });
      }}
      onCancel={onClose}
      onHide={onClose}
    >
      <Form fluid formValue={formValue} onChange={setFormValue}>
        <CRSelectInput
          virtualized={false}
          name="image"
          value={formValue.id}
          data={images}
          block
        />
        <CRTextInput virtualized={false} label="Value" name="value" block />
        <AddImageImages
          name="documents"
          onChange={val => updateProp('documents', val)}
          value={formValue.documents}
        />
      </Form>
    </CRModal>
  );
};

InsertImageResult.propTypes = {};

export default InsertImageResult;
