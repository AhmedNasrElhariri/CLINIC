import React from 'react';

import { H7, Div } from 'components';
import { DeleteLinkStyled, Item } from './style';

function ListInvoiceItems({ items, onDelete }) {
  return (
    <Div>
      {items.map((item, idx) => (
        <Item key={idx}>
          <Div display="flex" alignItems="center">
            <H7 color="texts.1">
              {item.quantity}{' / '}
            </H7>
            <H7 color="texts.1" textDecoration="underline">
              {item.name}
            </H7>
            <DeleteLinkStyled cursor="pointer" onClick={() => onDelete(idx)}>
              Delete
            </DeleteLinkStyled>
          </Div>
          <Div display="flex" alignItems="center">
            <H7 color="texts.1">EGP {item.price * item.quantity}</H7>
          </Div>
        </Item>
      ))}
    </Div>
  );
}

ListInvoiceItems.defaultProps = {
  items: [],
  priceKey: 'price',
};

export default ListInvoiceItems;
