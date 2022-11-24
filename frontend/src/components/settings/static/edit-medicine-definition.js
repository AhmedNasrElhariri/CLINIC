import React, { useMemo } from 'react';
import { ACTIONS } from 'utils/constants';
import {
  CRModal,
  CRTextInput,
  CRRadio,
  CRBrancheTree,
  Div,
  H3,
} from 'components';
import { Form } from 'rsuite';
import { useTranslation } from 'react-i18next';
import { concentrationOptions, formOptions } from './new-medicine-definition';

import { CRSelectInput } from 'components';

function EditMedicine({
  formValue,
  onChange,
  visible,
  onOk,
  onClose,
  checkResult,
  validate,
  show,
  setShow,
}) {
  const { t } = useTranslation();
  const header = t('editMedicine');

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
    >
      <Form formValue={formValue} onChange={onChange} fluid>
        <>
          <CRTextInput
            label={t('name')}
            name="name"
            errorMessage={
              show && checkResult['name'].hasError
                ? checkResult['name'].errorMessage
                : ''
            }
            placeholder="Type Name"
            block
          />
          {/* <CRTextInput
            label={t('concentration')}
            name="concentration"
            errorMessage={
              show && checkResult['concentration'].hasError
                ? checkResult['concentration'].errorMessage
                : ''
            }
            placeholder="Type Concentration"
            block
          /> */}
          <CRSelectInput
            name="form"
            label={t('medicineForm')}
            data={formOptions}
            block
          />
          <CRSelectInput
            name="concentration"
            label={t('concentration')}
            data={concentrationOptions}
            block
          />
          <CRBrancheTree
            formValue={formValue}
            onChange={onChange}
            action={ACTIONS.View_Medicine}
          />
        </>
      </Form>
    </CRModal>
  );
}

EditMedicine.defaultProps = {
  type: 'edit',
};

export default EditMedicine;
