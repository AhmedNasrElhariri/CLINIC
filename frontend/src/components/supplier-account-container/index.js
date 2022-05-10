import React, { useState } from 'react';
import { useSupplierAccounts } from 'hooks';
import ListSupplierAccount from './list-supplier-account';
import Filter from './filter';
const initialVal = {
  name: '',
};
const inialCurrentPage = {
  activePage: 1,
};
const SupplierAccount = () => {
  const [formValue, setFormValue] = useState(initialVal);
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const page = currentPage?.activePage;
  const { detailedSupplierAccounts, detailedSupplierAccountsCount } =
    useSupplierAccounts({
      page,
      name: formValue.name,
    });
  return (
    <>
      <Filter formValue={formValue} onChange={setFormValue} />
      <ListSupplierAccount
        supplierAccounts={detailedSupplierAccounts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={detailedSupplierAccountsCount}
      />
    </>
  );
};

export default SupplierAccount;
