import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import NewTiming from './new-timing';
import ListTiming from './list-timing';
import { useForm, useModal, useTimings } from 'hooks';
import { Schema } from 'rsuite';
import { useTranslation } from 'react-i18next';

const initValue = { name: '', englishPrintValue: '', arabicPrintValue: '' };
const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('Timing name is required'),
  englishPrintValue: StringType().isRequired('english Print Value is required'),
  arabicPrintValue: StringType().isRequired('Arabic Print Value is required'),
});

const Timing = () => {
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
  const { addTiming, timings, editTiming, deleteTiming, loading } = useTimings({
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
      const timing = R.pick([
        'id',
        'name',
        'englishPrintValue',
        'arabicPrintValue',
      ])(data);
      setType('edit');
      setFormValue(timing);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleClickDelete = useCallback(
    data => {
      const timing = R.pick([
        'id',
        'name',
        'englishPrintValue',
        'arabicPrintValue',
      ])(data);
      setType('delete');
      setFormValue(timing);
      open();
    },
    [open, setFormValue, setType]
  );

  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addTiming({
        variables: {
          timing: formValue,
        },
      });
    } else if (type === 'delete') {
      deleteTiming({
        variables: {
          timing: formValue,
          type: 'delete',
        },
      });
    } else {
      editTiming({
        variables: {
          timing: formValue,
          type: 'edit',
        },
      });
    }
  }, [addTiming, editTiming, deleteTiming, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate}>
          {t('addNewTiming')} +
        </CRButton>
      </Div>
      <NewTiming
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
      <ListTiming
        timings={timings}
        onEdit={handleClickEdit}
        onDelete={handleClickDelete}
      />
    </>
  );
};

export default Timing;
