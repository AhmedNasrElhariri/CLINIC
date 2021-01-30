import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import useFrom from 'hooks/form';
import { useModal } from 'components/widgets/modal';
import NewImageDefinition from './new-image-definition';
import ListImagesDefinition from './list-images-definition';

const initValue = { imageName: ''};

const ImageDefinition = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useFrom({
    initValue,
  });
  
  const handleClickCreate = useCallback(() => {
    setType('create');
    setFormValue(initValue);
    open();
  }, [open, setFormValue, setType]);

  const handleClickEdit = useCallback(
    data => {
      const test = R.pick(['id', 'imageName'])(data);
      setType('edit');
      setFormValue(test);
      open();
    },
    [open, setFormValue, setType]
  );

  const handleAdd = useCallback(() => {
    
  }, [formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton primary small onClick={handleClickCreate}>
          Add New Image +
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
      <ListImagesDefinition onEdit={handleClickEdit}/>
    </>
  );
};

export default ImageDefinition;
