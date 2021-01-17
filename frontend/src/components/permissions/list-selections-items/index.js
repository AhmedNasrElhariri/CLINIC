import React from 'react';

import { H6, Div } from 'components';
import { SessionNameStyled, DeleteLinkStyled } from './style';

function ListSelectionItems({ items, onDelete }) {
  return (
    <Div>
      {items.map((item, idx) => (
        <Div display="flex" justifyContent="space-between" key={idx}>
          <Div display="flex" alignItems="baseline">
            <SessionNameStyled color="texts.1">{item}</SessionNameStyled>
            <DeleteLinkStyled cursor="pointer" onClick={() => onDelete(idx)}>
              Delete
            </DeleteLinkStyled>
          </Div>
        </Div>
      ))}
    </Div>
  );
}

ListSelectionItems.defaultProps = {
  items: [],
};

export default ListSelectionItems;
