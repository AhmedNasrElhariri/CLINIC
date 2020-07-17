import React, { useCallback } from 'react';
import Nav from '@rsuite/responsive-nav';

import { ItemStyled } from './style';

export default ({ children, active, onSelect, eventKey, ...props }) => {
  const select = useCallback(e => onSelect(eventKey, e), [eventKey, onSelect]);

  return (
    <Nav.Item
      {...props}
      renderItem={() => (
        <ItemStyled onClick={select} active={active}>
          {children}
        </ItemStyled>
      )}
    />
  );
};
