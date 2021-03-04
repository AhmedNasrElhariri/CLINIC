import React from 'react';

import { H6, Div } from 'components';
import { SessionNameStyled, DeleteLinkStyled ,Item} from './style';

function ListInvoiceItems({ items, priceKey, onDelete }) {
  return (
    <Div>
      {items.map((item, idx) => (
        <Item key={idx}>
          <Div display="flex" alignItems="baseline">
            <SessionNameStyled color="texts.1">{item.name}</SessionNameStyled>
            <DeleteLinkStyled cursor="pointer" onClick={() => onDelete(idx)}>
              Delete
            </DeleteLinkStyled>
          </Div>
          EGP {item[priceKey] && <H6 color="texts.1">{item[priceKey]}</H6>}
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
