import React, { useCallback } from 'react';
import * as R from 'ramda';
import { Div, CRButton } from 'components';
import NewImageDefinition from './new-image-definition';
import ListImagesDefinition from './list-images-definition';
import { useForm, useImageDefinition } from 'hooks';
import { Schema } from 'rsuite';
import { useModal } from 'hooks';
import { useTranslation } from 'react-i18next';

const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('image name is required'),
});
const initValue = { name: '', categoryId: null };

const ImageDefinition = () => {
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
    addImageDefinition,
    imagesDefinition,
    editImageDefinition,
    deleteImageDefinition,
    loading,
  } = useImageDefinition({
    onCreate: () => {
      close();
      setShow(false);
      setFormValue(initValue);
    },
    onEdit: () => {
      close();
      setShow(false);
      setFormValue(initValue);
    },
    onDelete: () => {
      close();
      setShow(false);
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
      const categoryId = data?.category.id;
      const image = R.pick(['id', 'name'])(data);
      setType('edit');
      setFormValue({ ...image, categoryId: categoryId });
      open();
    },
    [open, setFormValue, setType]
  );
  const handleClickDelete = useCallback(
    data => {
      const image = R.pick(['id', 'name'])(data);
      const categoryId = data?.category.id;
      setType('delete');
      setFormValue({ ...image, categoryId: categoryId });
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addImageDefinition({
        variables: {
          imageDefinition: formValue,
        },
      });
    } else if (type === 'delete') {
      deleteImageDefinition({
        variables: {
          imageDefinition: formValue,
          type: 'delete',
        },
      });
    } else {
      editImageDefinition({
        variables: {
          imageDefinition: formValue,
          type: 'edit',
        },
      });
    }
  }, [addImageDefinition, editImageDefinition, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate} mt={2}>
          {t('addNewImageDefinition')}+
        </CRButton>
      </Div>
      <NewImageDefinition
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
      <ListImagesDefinition
        images={imagesDefinition}
        onEdit={handleClickEdit}
        onDelete={handleClickDelete}
      />
    </>
  );
};

export default ImageDefinition;
