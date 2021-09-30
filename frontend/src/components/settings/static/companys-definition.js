import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import NewCompanyDefinition from './new-company-definition';
import ListCompanysDefinition from './list-companys-definition';
import { useForm, useCompanyDefinition } from 'hooks';
import { Schema } from 'rsuite';
import { Validate } from 'services/form';
import { useModal } from 'hooks';

const initValue = { name: '' };
const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('Company name is required'),
});

const CompanyDefinition = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  const { addCompanyDefinition, companysDefinition, editCompanyDefinition } =
    useCompanyDefinition({
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
    if (type === 'create' && Validate(model, formValue)) {
      addCompanyDefinition({
        variables: {
          companyDefinition: formValue,
        },
      });
    } else if (type === 'edit' && Validate(model, formValue)) {
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
