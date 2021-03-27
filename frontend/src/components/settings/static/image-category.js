import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import useFrom from 'hooks/form';
import NewImageCategory from './new-image-category';
import ListImagesCategory from './list-images-category';
import useImagesCategory from 'hooks/fetch-images-category';
import useModal from 'hooks/use-model';

const initValue = { name: '' };

const ImageCategory = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useFrom({
    initValue,
  });
  const {
    addImageCategory,
    imagesCategory,
    editImageCategory,
  } = useImagesCategory({
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
      const image = R.pick(['id', 'name'])(data);
      setType('edit');
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
    } else {
      editImageCategory({
        variables: {
          imageCategory: formValue,
        },
      });
    }
  }, [addImageCategory, editImageCategory, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton
          variant="primary"
          onClick={handleClickCreate}
          style={{ marginTop: 4 }}
        >
          Add New Image Category+
        </CRButton>
      </Div>
      <NewImageCategory
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
      />
      <ListImagesCategory
        imagesCategory={imagesCategory}
        onEdit={handleClickEdit}
      />
    </>
  );
};

export default ImageCategory;
