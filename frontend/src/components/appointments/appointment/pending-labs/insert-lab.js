import React, { useEffect } from 'react';
import { Form } from 'rsuite';

import { CRModal, CRTextInput } from 'components';
import AddLabImages from '../add-lab-images';
import { CRSelectInput } from 'components/widgets';
import { useForm } from 'hooks';
import { useTranslation } from 'react-i18next';

const InsertLabResult = ({ visible, onClose, onCreate, id, labs }) => {
  const { t } = useTranslation();
  const { formValue, setFormValue, updateProp } = useForm({
    initValue: {
      id,
      value: '',
      documents: [],
    },
  });
  console.log(formValue, 'FVVV');
  useEffect(() => {
    updateProp('id', id);
  }, [id, updateProp]);

  return (
    <CRModal
      header="Update Lab Docs"
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
          name="lab"
          value={formValue.id}
          data={labs}
          block
        />
        <CRTextInput
          virtualized={false}
          label={t('value')}
          name="value"
          block
        />
        <AddLabImages
          name="documents"
          onChange={val => updateProp('documents', val)}
          value={formValue.documents}
        />
      </Form>
    </CRModal>
  );
};

InsertLabResult.propTypes = {};

export default InsertLabResult;
