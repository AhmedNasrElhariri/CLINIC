import React, { useState, useCallback } from 'react';
import { useSupplierAccounts, useModal } from 'hooks';
import ListSupplierAccount from './list-supplier-account';
import Filter from './filter';
import { useTranslation } from 'react-i18next';
import DeleteSupplierAccount from './delete-supplier-account';
import * as R from 'ramda';

const initialVal = {
  name: '',
};
const inialCurrentPage = {
  activePage: 1,
};
const SupplierAccount = () => {
  const [formValue, setFormValue] = useState(initialVal);
  const [type, setType] = useState('');
  const { visible, open, close } = useModal();
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const { t } = useTranslation();
  const page = currentPage?.activePage;
  const {
    detailedSupplierAccounts,
    detailedSupplierAccountsCount,
    deleteSupplier,
  } = useSupplierAccounts({
    page,
    name: formValue.name,
    onDelete: () => {
      close();
      setFormValue(initialVal);
    },
  });
  const pages = Math.ceil(detailedSupplierAccountsCount / 20);
  const handleClickDelete = useCallback(
    data => {
      const supplier = R.pick(['id'])(data);
      setType('delete');
      setFormValue({ ...supplier });
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'delete') {
      deleteSupplier({
        variables: {
          id: formValue.id,
        },
      });
    }
  }, [deleteSupplier, formValue, type]);

  return (
    <>
      <Filter formValue={formValue} onChange={setFormValue} t={t} />
      <ListSupplierAccount
        supplierAccounts={detailedSupplierAccounts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
        t={t}
        onDelete={handleClickDelete}
      />
      <DeleteSupplierAccount
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
      />
    </>
  );
};

export default SupplierAccount;
