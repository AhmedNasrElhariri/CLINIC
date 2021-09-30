import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import NewImageDefinition from './new-image-definition';
import ListImagesDefinition from './list-images-definition';
import { useForm, useImageDefinition } from 'hooks';
import { Validate } from 'services/form';
import { Schema } from 'rsuite';
import { useModal } from 'hooks';

const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('image name is required'),
});
const initValue = { name: '', categoryId: null };

const ImageDefinition = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  const { addImageDefinition, imagesDefinition, editImageDefinition } =
    useImageDefinition({
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
    if (type === 'create' && Validate(model, formValue)) {
      addImageDefinition({
        variables: {
          imageDefinition: formValue,
        },
      });
    } else if (type === 'edit' && Validate(model, formValue)) {
      editImageDefinition({
        variables: {
          imageDefinition: formValue,
        },
      });
    }
  }, [addImageDefinition, editImageDefinition, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate} mt={2}>
          Add New Image+
        </CRButton>
      </Div>
      <NewImageDefinition
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
      />
      <ListImagesDefinition
        images={imagesDefinition}
        onEdit={handleClickEdit}
      />
    </>
  );
};

export default ImageDefinition;
