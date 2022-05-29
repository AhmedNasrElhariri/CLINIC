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
  const header = useMemo(
    () => (type === 'create' ? 'Add New Sales' : 'Edit Sales '),
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
    >
      <Form formValue={formValue} model={model} onChange={onChange} fluid>
        {type === 'delete' ? (
          <h3>Are you sure that you want delete this sales</h3>
        ) : (
          <>
            <ReactToPrint
              trigger={() => <CRButton>Print</CRButton>}
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
              {type === 'create' && (
                <Div>
                  <CRDocSelectInput
                    formValue={formValue}
                    branchId={formValue?.branchId}
                    specialtyId={formValue?.specialtyId}
                    userId={formValue?.userId}
                    onChange={val =>
                      onChange({ ...formValue, itemId: val?.id })
                    }
                    label="Item"
                    data={salesesDefinition}
                    placement="left"
                    style={{ width: '240px' }}
                    block
                  />
                </Div>
              )}
              <Div display="flex">
                <CRNumberInput
                  name="quantity"
                  label="Quantity"
                  value={formValue.quantity}
                />
              </Div>
              {type === 'create' && (
                <CRButton variant="primary" onClick={handleAdd}>
                  add
                </CRButton>
              )}
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
