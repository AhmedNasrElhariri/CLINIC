import React from 'react';

import { H7, Div } from 'components';
import { Item, DeleteLinkStyled } from './style';

function ListInvoiceItems({ items, priceKey, onDelete }) {
  return (
    <Div>
      {items.map((item, idx) => (
        <Item key={idx}>
          <Div display="flex" alignItems="center">
            <H7 color="texts.1">
              {item?.Quantity}
              {' / '}
            </H7>
            <H7 color="texts.1" textDecoration="underline">
              {item?.name}
            </H7>
            <DeleteLinkStyled cursor="pointer" onClick={() => onDelete(idx)}>
              Delete
            </DeleteLinkStyled>
          </Div>
          <Div display="flex" alignItems="center">
            <H7 color="texts.1">EGP {item[priceKey] * item?.Quantity}</H7>
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
