import { Div, CRNumberInput } from 'components';
import { Button, Form } from 'rsuite';
import { useCallback } from 'react';
function ListInvoiceItems({
  items,
  priceKey,
  onDelete,
  formValue,
  onChange,
  isSelling,
  t,
}) {
  const handleChangePricePerBox = useCallback(
    (value, index) => {
      onChange(
        formValue.map((s, indx) =>
          indx === index
            ? { ...s, pricePerBox: value, pricePerUnit: value / s.quantity }
            : s
        )
      );
    },
    [formValue]
  );
  const handleChangePricePerUnit = useCallback(
    (value, index) => {
      onChange(
        formValue.map((s, indx) =>
          indx === index
            ? { ...s, pricePerUnit: value, pricePerBox: value * s.quantity }
            : s
        )
      );
    },
    [formValue]
  );
  const ItemName = itemId => {
    const item = items.find(i => i.id === itemId);
    return (
      <h6 style={isSelling ? { width: '200px', marginTop: '30px' } : {}}>
        {`${item?.Quantity} / ${item?.name} / ${item?.branch?.name}`}
      </h6>
    );
  };
  return (
    <>
      {formValue.length > 0 && (
        <Div className="bg-slate-100 p-3">
          {formValue.map((item, idx) => (
            <div key={idx} className="flex items-center">
              <h6
                style={isSelling ? { width: '200px', marginTop: '23px' } : {}}
              >
                {ItemName(item?.itemId)}
              </h6>
              {isSelling && (
                <Form>
                  <Div display="flex">
                    <CRNumberInput
                      label={t('pricePerBox')}
                      name="pricePerBox"
                      size="md"
                      value={item.pricePerBox}
                      onChange={val => handleChangePricePerBox(val, idx)}
                    />
                    <CRNumberInput
                      label={t('pricePerUnit')}
                      name="pricePerUnit"
                      size="md"
                      value={item.pricePerUnit}
                      onChange={val => handleChangePricePerUnit(val, idx)}
                    />
                  </Div>
                </Form>
              )}

              <Button
                className={
                  isSelling
                    ? 'ml-auto !text-red-500 mt-10'
                    : 'ml-auto !text-red-500'
                }
                onClick={() => onDelete(idx)}
              >
                Delete
              </Button>
            </div>
          ))}
        </Div>
      )}
    </>
  );
}

ListInvoiceItems.defaultProps = {
  items: [],
  priceKey: 'price',
};

export default ListInvoiceItems;
