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
    [type]
  );
  const ref = useRef();
  const { salesesDefinition } = useSalesDefinition({});
  const itemsList = useMemo(() => {
    const byIds = normalize(salesesDefinition);
    return selectedItems.map(({ itemId, quantity }) => ({
      ...byIds[itemId],
      quantity,
    }));
  }, [selectedItems]);
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
              />
            )}

            <Div display="flex" justifyContent="space-between" mt={3}>
              <Div>
                <CRDocSelectInput
                  formValue={formValue}
                  branchId={formValue?.branchId}
                  specialtyId={formValue?.specialtyId}
                  userId={formValue?.userId}
                  onChange={val => onChange({ ...formValue, itemId: val?.id })}
                  label={t('item')}
                  data={salesesDefinition}
                  placement="auto"
                  style={{ width: '240px' }}
                  block
                />
              </Div>
              <Div display="flex">
                <CRNumberInput
                  name="quantity"
                  label={t('quantity')}
                  value={formValue.quantity}
                />
              </Div>
              <CRButton variant="primary" onClick={handleAdd}>
                {t('add')}
              </CRButton>
            </Div>
            <ListInvoiceItems items={itemsList} onDelete={handleDelete} />
            <Div style={{ overflow: 'hidden', height: '0px' }}>
              <Div ref={ref}>
                <H4 textAlign="center" margin="10px">
                  Sales Invoice
                </H4>
                {itemsList.map((item, idx) => (
                  <Div
                    display="flex"
                    justifyContent="space-between"
                    width="400px"
                    mb={10}
                    key={idx}
                  >
                    <Div display="flex" alignItems="center" ml={10}>
                      <H7 color="texts.1">
                        {item.quantity}
                        {' / '}
                      </H7>
                      <H7 color="texts.1" textDecoration="underline">
                        {item.name}
                      </H7>
                    </Div>
                    <Div display="flex" alignItems="center" ml={10}>
                      <H7 color="texts.1">EGP {item.price * item.quantity}</H7>
                    </Div>
                  </Div>
                ))}
                <Div
                  display="flex"
                  justifyContent="space-between"
                  width="400px"
                  mb={10}
                >
                  <Div ml={10}>Total</Div>
                  <Div>EGP {total}</Div>
                </Div>
              </Div>
            </Div>
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
