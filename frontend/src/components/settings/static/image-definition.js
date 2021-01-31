import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import useFrom from 'hooks/form';
import { useModal } from 'components/widgets/modal';
import NewImageDefinition from './new-image-definition';
import ListImagesDefinition from './list-images-definition';
import useImagesDefinition from 'hooks/fetch-images-definition';

const initValue = { imageName: ''};

const ImageDefinition = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useFrom({
    initValue,
  });
  const { addImageDefinition , imagesDefinition , editImageDefinition } = useImagesDefinition({
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
      const image = R.pick(['id', 'imageName'])(data);
      setType('edit');
      setFormValue(image);
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
    } 
    else {
      editImageDefinition({
        variables: {
          imageDefinition: formValue,
        },
      });
    }
  }, [addImageDefinition, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton primary small onClick={handleClickCreate} style={{marginTop:4}}>
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
      <ListImagesDefinition images={imagesDefinition} onEdit={handleClickEdit}/>
    </>
  );
};

export default ImageDefinition;
