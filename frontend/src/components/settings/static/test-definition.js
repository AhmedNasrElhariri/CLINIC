import React, { useCallback } from 'react';
import * as R from 'ramda';
import { Div, CRButton } from 'components';
import NewLabDefinition from './new-test-definition';
import ListLabsDefinition from './list-tests-definition';
import { useForm, useModal, useLabDefinitions } from 'hooks';
import { Schema } from 'rsuite';
const initValue = { name: '', categoryId: null };
const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('Lab name is required'),
});
const LabDefinition = () => {
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
  const { addLabDefinition, labsDefinition, editLabDefinition } =
    useLabDefinitions({
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
      const labDefinition = R.pick(['id', 'name'])(data);
      setType('edit');
      setFormValue(labDefinition);
      open();
    },
    [open, setFormValue, setType]
  );

  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addLabDefinition({
        variables: {
          labDefinition: formValue,
        },
      });
    } else {
      editLabDefinition({
        variables: {
          labDefinition: formValue,
        },
      });
    }
  }, [addLabDefinition, editLabDefinition, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate}>
          Add New Lab +
        </CRButton>
      </Div>
      <NewLabDefinition
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
      <ListLabsDefinition labs={labsDefinition} onEdit={handleClickEdit} />
    </>
  );
};

export default LabDefinition;
