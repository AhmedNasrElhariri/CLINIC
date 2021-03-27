import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import useFrom from 'hooks/form';
import NewLabCategory from './new-lab-category';
import ListLabsCategory from './list-labs-category';
import useLabsCategory from 'hooks/fetch-labs-category';
import useModal from 'hooks/use-model';

const initValue = { name: '' };

const LabCategory = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useFrom({
    initValue,
  });
  const { addLabCategory, labsCategory, editLabCategory } = useLabsCategory({
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
      const labCategory = R.pick(['id', 'name'])(data);
      setType('edit');
      setFormValue(labCategory);
      open();
    },
    [open, setFormValue, setType]
  );

  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addLabCategory({
        variables: {
          labCategory: formValue,
        },
      });
    } else {
      editLabCategory({
        variables: {
          labCategory: formValue,
        },
      });
    }
  }, [addLabCategory, editLabCategory, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate}>
          Add New Lab Category+
        </CRButton>
      </Div>
      <NewLabCategory
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
      />
      <ListLabsCategory labsCategory={labsCategory} onEdit={handleClickEdit} />
    </>
  );
};

export default LabCategory;
