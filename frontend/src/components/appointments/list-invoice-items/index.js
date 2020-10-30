import React from 'react';

import { H6, Div } from 'components';
import { SessionNameStyled, DeleteLinkStyled } from './style';

function ListInvoiceItems({ items, priceKey, onDelete }) {
  return (
    <Div>
      {items.map((item, idx) => (
        <Div display="flex" justifyContent="space-between" key={idx}>
          <Div display="flex" alignItems="baseline">
            <SessionNameStyled color="texts.1">{item.name}</SessionNameStyled>
            <DeleteLinkStyled cursor="pointer" onClick={() => onDelete(idx)}>
              Delete
            </DeleteLinkStyled>
          </Div>
          {item[priceKey] && <H6 color="texts.1">{item[priceKey]}</H6>}
        </Div>
      ))}
    </Div>
  );
}

ListInvoiceItems.defaultProps = {
  items: [],
  priceKey: 'price',
};

export default ListInvoiceItems;
