import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import NewLabDefinition from './new-test-definition';
import ListLabsDefinition from './list-tests-definition';
import { useForm, useModal, useLabDefinitions } from 'hooks';

const initValue = { name: '', category: '' };

const LabDefinition = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  const {
    addLabDefinition,
    labsDefinition,
    editLabDefinition,
  } = useLabDefinitions({
    onCreate: () => {
      close();
      setFormValue(initValue);
    },
    onEdit: () => {
      close();
      setFormValue(initValue);
    },
  });

  const handleClickCreate = useCallback(() => {
    setType('create');
    setFormValue(initValue);
    open();
  }, [open, setFormValue, setType]);

  const handleClickEdit = useCallback(
    data => {
      const labDefinition = R.pick(['id', 'name'])(data);
      setType('edit');
      setFormValue(labDefinition);
      open();
    },
    [open, setFormValue, setType]
  );

  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addLabDefinition({
        variables: {
          labDefinition: formValue,
        },
      });
    } else {
      editLabDefinition({
        variables: {
          labDefinition: formValue,
        },
      });
    }
  }, [addLabDefinition, editLabDefinition, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate}>
          Add New Lab +
        </CRButton>
      </Div>
      <NewLabDefinition
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
      />
      <ListLabsDefinition labs={labsDefinition} onEdit={handleClickEdit} />
    </>
  );
};

export default LabDefinition;
