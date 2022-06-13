import React, { useCallback } from 'react';
import * as R from 'ramda';
import { Div, CRButton } from 'components';
import NewImageCategory from './new-image-category';
import ListImagesCategory from './list-images-category';
import { useImageCategory, useModal, useForm } from 'hooks';
import { Schema } from 'rsuite';
import { useTranslation } from 'react-i18next';

const initValue = { name: '' };
const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('image category name is required'),
});

const ImageCategory = () => {
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
    addImageCategory,
    imagesCategory,
    editImageCategory,
    deleteImageCategory,
    loading,
  } = useImageCategory({
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
      const image = R.pick(['id', 'name'])(data);
      setType('edit');
      setFormValue(image);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleClickDelete = useCallback(
    data => {
      const image = R.pick(['id', 'name'])(data);
      setType('delete');
      setFormValue(image);
      open();
    },
    [open, setFormValue, setType]
  );

  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addImageCategory({
        variables: {
          imageCategory: formValue,
        },
      });
    } else if (type === 'delete') {
      deleteImageCategory({
        variables: {
          imageCategory: formValue,
          type: 'delete',
        },
      });
    } else {
      editImageCategory({
        variables: {
          imageCategory: formValue,
          type: 'edit',
        },
      });
    }
  }, [
    addImageCategory,
    editImageCategory,
    deleteImageCategory,
    formValue,
    type,
  ]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate} mt={2}>
          {t('addNewImageCategory')}+
        </CRButton>
      </Div>
      <NewImageCategory
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
      <ListImagesCategory
        imagesCategory={imagesCategory}
        onEdit={handleClickEdit}
        onDelete={handleClickDelete}
      />
    </>
  );
};

export default ImageCategory;
