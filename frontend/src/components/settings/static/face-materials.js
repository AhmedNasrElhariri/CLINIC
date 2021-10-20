import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import NewMaterialDefinition from './new-material-definition';
import ListMaterialsDefinition from './list-materials-definition';
import { useForm, useMaterialDefinition } from 'hooks';

import { useModal } from 'hooks';

const initValue = { name: '' };

const MaterialDefinition = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  const {
    addMaterialDefinition,
    materialsDefinition,
    editMaterialDefinition,
  } = useMaterialDefinition({
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
      const material = R.pick(['id', 'name'])(data);
      setType('edit');
      setFormValue(material);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addMaterialDefinition({
        variables: {
          materialDefinition: formValue,
        },
      });
    } else {
      editMaterialDefinition({
        variables: {
          materialDefinition: formValue,
        },
      });
    }
  }, [addMaterialDefinition, editMaterialDefinition, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate} mt={2}>
          Add New Material+
        </CRButton>
      </Div>
      <NewMaterialDefinition
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
      />
      <ListMaterialsDefinition
        materials={materialsDefinition}
        onEdit={handleClickEdit}
      />
    </>
  );
};

export default MaterialDefinition;
