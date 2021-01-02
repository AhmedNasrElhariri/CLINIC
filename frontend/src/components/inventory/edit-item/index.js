import React, { memo, useCallback, useEffect } from 'react';
import { Form, Schema, Alert, Icon } from 'rsuite';
import * as R from 'ramda';

import { CRModal, CRTextInput } from 'components';
import { isValid } from 'services/form';
import { useModal } from '../../widgets/modal';
import useFetctchInventory from 'hooks/fetch-inventory';
import useFrom from 'hooks/form';

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Name Type is required'),
});

const EditItem = ({ defaultValue }) => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue } = useFrom({
    initValue: {
      name: '',
    },
  });

  useEffect(() => {
    const item = R.pick(['id', 'name'])(defaultValue);
    setFormValue(item);
  }, []);

  const { update } = useFetctchInventory({
    onCreateCompleted: () => {
      Alert.success('Item has been created successfully');
      close();
    },
  });

  const handleClose = useCallback(() => {
    close();
  }, [close]);

  return (
    <>
      <Icon icon="edit" onClick={open} />

      <CRModal
        show={visible}
        header="Edit Item"
        onOk={() => {
          if (!isValid(model, formValue)) {
            Alert.error('Complete Required Fields');
            return;
          }
          update(formValue);
        }}
        onHide={handleClose}
        onCancel={handleClose}
      >
        <Form formValue={formValue} model={model} onChange={setFormValue} fluid>
          <CRTextInput label="Name" name="name" block></CRTextInput>
        </Form>
      </CRModal>
    </>
  );
};

EditItem.propTypes = {};

export default memo(EditItem);
