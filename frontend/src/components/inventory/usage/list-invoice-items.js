import React from 'react';

import { Div } from 'components';
import { Button } from 'rsuite';

function ListInvoiceItems({ items, priceKey, onDelete }) {
  return (
    <Div className="bg-slate-100 p-3">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center">
          <h6>{`${item?.Quantity} / ${item?.name}`}</h6>
          <Button
            className="ml-auto !text-red-500"
            onClick={() => onDelete(idx)}
          >
            Delete
          </Button>
        </div>
      ))}
    </Div>
  );
}

ListInvoiceItems.defaultProps = {
  items: [],
  priceKey: 'price',
};

export default ListInvoiceItems;
