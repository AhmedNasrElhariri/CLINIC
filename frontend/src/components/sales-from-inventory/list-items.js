import { Div } from 'components';
import { approximatlyToTwoNumbers } from 'services/general';

import { Button } from 'rsuite';
function ListInvoiceItems({ items, priceKey, onDelete, formValue }) {
  const ItemName = itemId => {
    const item = items.find(i => i.id === itemId);
    return (
      <h6>{`${approximatlyToTwoNumbers(
        item?.Quantity / item?.item?.quantity
      )} boxes (${item?.Quantity} units)  / ${item?.name} / ${
        item?.branch?.name
      } `}</h6>
    );
  };
  return (
    <>
      {formValue.length > 0 && (
        <Div className="bg-slate-100 p-3">
          {formValue.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <h6 className="flex">
                {ItemName(item?.itemId)} {' / '}
                {item?.pricePerBox} L.E.
              </h6>

              <Button className="!text-red-500" onClick={() => onDelete(idx)}>
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
