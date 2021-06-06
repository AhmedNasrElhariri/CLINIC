import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import NewCompanySessionDefinition from './new-company-session-definition';
import ListCompanysSessionDefinition from './list-companys-session-definition';
import { useForm, useCompanySessionDefinition } from 'hooks';

import { useModal } from 'hooks';

const initValue = { companyId: null, name: '', price: 0 };

const CompanySessionDefinition = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  const {
    addCompanySessionDefinition,
    companysSessionDefinition,
    editCompanySessionDefinition,
  } = useCompanySessionDefinition({
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
      const companySession = R.pick(['id', 'price'])(data);
      setType('edit');
      setFormValue(companySession);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addCompanySessionDefinition({
        variables: {
          companySessionDefinition: formValue,
        },
      });
    } else {
      editCompanySessionDefinition({
        variables: {
          companySessionDefinition: formValue,
        },
      });
    }
  }, [
    addCompanySessionDefinition,
    editCompanySessionDefinition,
    formValue,
    type,
  ]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate} mt={2}>
          Add New Company Session+
        </CRButton>
      </Div>
      <NewCompanySessionDefinition
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
      />
      <ListCompanysSessionDefinition
        companysSession={companysSessionDefinition}
        onEdit={handleClickEdit}
      />
    </>
  );
};

export default CompanySessionDefinition;
