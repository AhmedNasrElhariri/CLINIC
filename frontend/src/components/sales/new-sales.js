import React, { useMemo, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { Form, Schema } from 'rsuite';
import { ACTIONS } from 'utils/constants';
import {
  CRModal,
  CRNumberInput,
  Div,
  CRButton,
  H7,
  H4,
  CRDocSelectInput,
  CRBrancheTree,
} from 'components';
import { useSalesDefinition } from 'hooks';
import ListInvoiceItems from './list-invoice-items';
import { normalize } from 'utils/misc';
import { useTranslation } from 'react-i18next';

const model = Schema.Model({});

function NewSales({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
  handleAdd,
  handleDelete,
  selectedItems,
  loading,
}) {
  const { t } = useTranslation();
  const header = useMemo(
    () => (type === 'create' ? t('addNewSales') : t('editSales')),
    [type, t]
  );
  const ref = useRef();
  const { salesesDefinition } = useSalesDefinition({});
  const itemsList = useMemo(() => {
    const byIds = normalize(salesesDefinition);
    return selectedItems.map(({ itemId, quantity }) => ({
      ...byIds[itemId],
      quantity,
    }));
  }, [selectedItems, salesesDefinition]);
  const total = useMemo(
    () =>
      itemsList.reduce((acc, { price, quantity }) => acc + price * quantity, 0),
    [itemsList]
  );
  return (
    <CRModal
      show={visible}
      header={header}
      loading={loading}
      onOk={onOk}
      onHide={onClose}
      onCancel={onClose}
      okTitle={t('ok')}
      cancelTitle={t('cancel')}
    >
      <Form formValue={formValue} model={model} onChange={onChange} fluid>
        {type === 'delete' ? (
          t('deleteSalesMessage')
        ) : (
          <>
            <ReactToPrint
              trigger={() => <CRButton>{t('print')}</CRButton>}
              content={() => ref.current}
            />
            {type === 'create' && (
              <CRBrancheTree
                formValue={formValue}
                onChange={onChange}
                action={ACTIONS.Create_Sales}
                notAllowSpecialty
                notAllowUser
              />
            )}
            <div className="flex flex-wrap items-end gap-4">
              <CRDocSelectInput
                formValue={formValue}
                branchId={formValue?.branchId}
                specialtyId={formValue?.specialtyId}
                userId={formValue?.userId}
                onChange={val => onChange({ ...formValue, itemId: val?.id })}
                label={t('item')}
                data={salesesDefinition}
                placement="auto"
                style={{ width: 256 }}
                block
              />
              <CRNumberInput
                name="quantity"
                label={t('quantity')}
                value={formValue.quantity}
                className="max-w-[64px]"
              />
              <CRButton variant="primary" onClick={handleAdd}>
                {t('add')}
              </CRButton>
            </div>
            <ListInvoiceItems items={itemsList} onDelete={handleDelete} />
          </>
        )}
      </Form>
    </CRModal>
  );
}

NewSales.defaultProps = {
  type: 'create',
};

export default NewSales;
