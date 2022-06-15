import React, { useState } from 'react';
import { useSupplierAccounts } from 'hooks';
import ListSupplierAccount from './list-supplier-account';
import Filter from './filter';
import { useTranslation } from 'react-i18next';

const initialVal = {
  name: '',
};
const inialCurrentPage = {
  activePage: 1,
};
const SupplierAccount = () => {
  const [formValue, setFormValue] = useState(initialVal);
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const { t } = useTranslation();
  const page = currentPage?.activePage;
  const { detailedSupplierAccounts, detailedSupplierAccountsCount } =
    useSupplierAccounts({
      page,
      name: formValue.name,
    });
    const pages = Math.ceil(detailedSupplierAccountsCount / 20);
  return (
    <>
      <Filter formValue={formValue} onChange={setFormValue} t={t}/>
      <ListSupplierAccount
        supplierAccounts={detailedSupplierAccounts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
        t={t}
      />
    </>
  );
};

export default SupplierAccount;
