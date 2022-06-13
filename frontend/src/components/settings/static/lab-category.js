import React, { useCallback } from 'react';
import * as R from 'ramda';
import { Div, CRButton } from 'components';
import NewLabCategory from './new-lab-category';
import ListLabsCategory from './list-labs-category';
import { Schema } from 'rsuite';
import { useForm, useLabCategory, useModal } from 'hooks';
import { useTranslation } from 'react-i18next';

const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('Category name is required'),
});
const initValue = { name: '' };

const LabCategory = () => {
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
    addLabCategory,
    labsCategory,
    editLabCategory,
    deleteLabCategory,
    loading,
  } = useLabCategory({
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
      const labCategory = R.pick(['id', 'name'])(data);
      setType('edit');
      setFormValue(labCategory);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleClickDelete = useCallback(
    data => {
      const labCategory = R.pick(['id', 'name'])(data);
      setType('delete');
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
    } else if (type === 'delete') {
      deleteLabCategory({
        variables: {
          labCategory: formValue,
          type: 'delete',
        },
      });
    } else {
      editLabCategory({
        variables: {
          labCategory: formValue,
          type: 'edit',
        },
      });
    }
  }, [addLabCategory, editLabCategory, deleteLabCategory, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate}>
          {t('addNewLabCategory')}+
        </CRButton>
      </Div>
      <NewLabCategory
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
      <ListLabsCategory
        labsCategory={labsCategory}
        onEdit={handleClickEdit}
        onDelete={handleClickDelete}
      />
    </>
  );
};

export default LabCategory;
