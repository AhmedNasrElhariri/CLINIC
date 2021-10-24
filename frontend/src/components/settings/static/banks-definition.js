import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import NewBankDefinition from './new-bank-definition';
import ListBanksDefinition from './list-banks-definition';
import { useForm, useBankDefinition } from 'hooks';
import { Schema } from 'rsuite';
import { useModal } from 'hooks';

const initValue = { name: '' };
const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('Bank name is required'),
});

const BankDefinition = () => {
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
  const { addBankDefinition, banksDefinition, editBankDefinition, loading } =
    useBankDefinition({
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
      const bank = R.pick(['id', 'name'])(data);
      setType('edit');
      setFormValue(bank);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addBankDefinition({
        variables: {
          bankDefinition: formValue,
        },
      });
    } else {
      editBankDefinition({
        variables: {
          bankDefinition: formValue,
        },
      });
    }
  }, [addBankDefinition, editBankDefinition, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate} mt={2}>
          Add New Bank+
        </CRButton>
      </Div>
      <NewBankDefinition
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
      <ListBanksDefinition banks={banksDefinition} onEdit={handleClickEdit} />
    </>
  );
};

export default BankDefinition;
