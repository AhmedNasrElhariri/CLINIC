import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import NewCompanyDefinition from './new-company-definition';
import ListCompanysDefinition from './list-companys-definition';
import { useForm, useCompanyDefinition } from 'hooks';

import { useModal } from 'hooks';

const initValue = { name: ''};

const CompanyDefinition = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  const {
    addCompanyDefinition,
    companysDefinition,
    editCompanyDefinition,
  } = useCompanyDefinition({
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
      const company = R.pick(['id', 'name'])(data);
      setType('edit');
      setFormValue(company);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addCompanyDefinition({
        variables: {
          companyDefinition: formValue,
        },
      });
    } else {
      editCompanyDefinition({
        variables: {
          companyDefinition: formValue,
        },
      });
    }
  }, [addCompanyDefinition, editCompanyDefinition, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate} mt={2}>
          Add New Company+
        </CRButton>
      </Div>
      <NewCompanyDefinition
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
      />
      <ListCompanysDefinition
        companys={companysDefinition}
        onEdit={handleClickEdit}
      />
    </>
  );
};

export default CompanyDefinition;