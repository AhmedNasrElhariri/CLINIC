import React, { useCallback } from 'react';
import * as R from 'ramda';
import { Div, CRButton } from 'components';
import NewMaterialDefinition from './new-material-definition';
import ListMaterialsDefinition from './list-materials-definition';
import { useForm, useMaterialDefinition } from 'hooks';
import { Schema } from 'rsuite';
import { useModal } from 'hooks';
import { useTranslation } from 'react-i18next';

const initValue = { name: '' };
const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('face material name is required'),
});

const MaterialDefinition = () => {
  const { visible, open, close } = useModal();
  const { t } = useTranslation();
  const {
    formValue,
    setFormValue,
    type,
    setType,
    checkResult,
    validate,
    show,
    setShow,
  } = useForm({
    initValue,
    model,
  });
  const {
    addMaterialDefinition,
    materialsDefinition,
    editMaterialDefinition,
    loading,
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
          {t('addNewFaceMaterial')}+
        </CRButton>
      </Div>
      <NewMaterialDefinition
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
        checkResult={checkResult}
        validate={validate}
        show={show}
        setShow={setShow}
        loading={loading}
      />
      <ListMaterialsDefinition
        materials={materialsDefinition}
        onEdit={handleClickEdit}
      />
    </>
  );
};

export default MaterialDefinition;
