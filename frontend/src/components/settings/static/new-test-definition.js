import React, { useMemo } from 'react';
import { Form } from 'rsuite';

import { CRModal, CRTextInput, CRSelectInput, Div, H3 } from 'components';
import { useLabCategory } from 'hooks';


function NewLabDefinition({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
  checkResult,
  validate,
  show,
  setShow,
  loading,
}) {
  const header = useMemo(
    () =>
      type === 'create'
        ? 'Add New Lab Definition'
        : type === 'edit'
        ? 'Edit Lab Definition'
        : 'Delete Lab Definition',
    [type]
  );
  const { labsCategory } = useLabCategory();
  return (
    <CRModal
      show={visible}
      header={header}
      onOk={() => {
        setShow(true);
        validate && onOk();
      }}
      onHide={onClose}
      onCancel={onClose}
      loading={loading}
    >
      <Form formValue={formValue} model={model} onChange={onChange} fluid>
        {type === 'delete' ? (
          <Div>
            <H3>Are you sure that you want to delete the Lab ? </H3>
          </Div>
        ) : (
          <>
            <CRTextInput
              label="Lab Name"
              name="name"
              errorMessage={
                show && checkResult['name'].hasError
                  ? checkResult['name'].errorMessage
                  : ''
              }
              placeholder="Type Lab"
              block
            />
            <CRSelectInput
              label="Lab Category"
              name="categoryId"
              block
              data={labsCategory}
            />
          </>
        )}
      </Form>
    </CRModal>
  );
}

NewLabDefinition.defaultProps = {
  type: 'create',
};

export default NewLabDefinition;
