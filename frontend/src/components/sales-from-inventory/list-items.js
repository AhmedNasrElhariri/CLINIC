import { Div } from 'components';
import { approximatlyToTwoNumbers } from 'services/general';

import { Button } from 'rsuite';
function ListInvoiceItems({ items, priceKey, onDelete, formValue }) {
  const ItemName = item => {
    return (
      <h6>{`${approximatlyToTwoNumbers(item?.numberOfBoxes)} boxes (${
        item?.numberOfUnits
      } units)  / ${item?.name} / ${
        item?.branch ? item?.branch?.name : 'Organization warehouse'
      } `}</h6>
    );
  };
  return (
    <>
      {items.length > 0 && (
        <Div className="bg-slate-100 p-3">
          {items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <h6 className="flex">
                {ItemName(item)} {' / '}
                {item?.pricePerBox * item?.numberOfBoxes} L.E.
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
