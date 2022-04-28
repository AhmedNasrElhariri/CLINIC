import React from 'react';
import { useSupplierAccounts } from 'hooks';
import ListSupplierAccount from './list-supplier-account';

const SupplierAccount = () => {
  const { detailedSupplierAccounts } = useSupplierAccounts({});
  return (
    <>
      <ListSupplierAccount supplierAccounts={detailedSupplierAccounts} />
    </>
  );
};

export default SupplierAccount;
