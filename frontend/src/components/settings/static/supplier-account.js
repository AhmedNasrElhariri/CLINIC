import React, { useCallback } from 'react';
import * as R from 'ramda';
import { Div, CRButton } from 'components';
import NewSupplierAccount from './new-supplierAccount';
import ListSupplierAccount from './list-supplierAccount';
import { useForm, useModal, useSupplierAccounts } from 'hooks';
import { Schema } from 'rsuite';
import { useTranslation } from 'react-i18next';

const initValue = { name: '', phoneNo: '' };
const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('SupplierAccount name is required'),
  phoneNo: StringType().isRequired('Phone No is required'),
});

const SupplierAccount = () => {
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
    addSupplierAccount,
    supplierAccounts,
    editSupplierAccount,
    deleteSupplierAccount,
    loading,
  } = useSupplierAccounts({
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
      const supplierAccount = R.pick(['id', 'name', 'phoneNo'])(data);
      setType('edit');
      setFormValue(supplierAccount);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleClickDelete = useCallback(
    data => {
      const supplierAccount = R.pick(['id', 'name', 'phoneNo'])(data);
      setType('delete');
      setFormValue(supplierAccount);
      open();
    },
    [open, setFormValue, setType]
  );

  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addSupplierAccount({
        variables: {
          supplierAccount: formValue,
        },
      });
    } else if (type === 'delete') {
      deleteSupplierAccount({
        variables: {
          supplierAccount: formValue,
          type: 'delete',
        },
      });
    } else {
      editSupplierAccount({
        variables: {
          supplierAccount: formValue,
          type: 'edit',
        },
      });
    }
  }, [
    addSupplierAccount,
    editSupplierAccount,
    deleteSupplierAccount,
    formValue,
    type,
  ]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate}>
          {t('addNewSupplierAccount')} +
        </CRButton>
      </Div>
      <NewSupplierAccount
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
      <ListSupplierAccount
        supplierAccounts={supplierAccounts}
        onEdit={handleClickEdit}
        onDelete={handleClickDelete}
      />
    </>
  );
};

export default SupplierAccount;
