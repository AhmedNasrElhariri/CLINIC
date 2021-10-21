import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import NewCompanySessionDefinition from './new-company-session-definition';
import ListCompanysSessionDefinition from './list-companys-session-definition';
import { useForm, useCompanySessionDefinition } from 'hooks';
import { Schema } from 'rsuite';
import { useModal } from 'hooks';

const initValue = { companyId: null, name: '', price: 0 };
const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('Session name is required'),
  price: NumberType().range(1, 1000000).isRequired('price is required'),
});

const CompanySessionDefinition = () => {
  const { visible, open, close } = useModal();
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
    addCompanySessionDefinition,
    companysSessionDefinition,
    editCompanySessionDefinition,
  } = useCompanySessionDefinition({
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
        checkResult={checkResult}
        validate={validate}
        show={show}
        setShow={setShow}
      />
      <ListCompanysSessionDefinition
        companysSession={companysSessionDefinition}
        onEdit={handleClickEdit}
      />
    </>
  );
};

export default CompanySessionDefinition;
