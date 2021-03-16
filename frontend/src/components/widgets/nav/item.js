import React, { useCallback } from 'react';
import { Nav } from 'rsuite';

import { ItemStyled } from './style';

export default ({ children, active, onSelect, eventKey, ...props }) => {
  const handleSelect = useCallback(e => onSelect(eventKey, e), [
    eventKey,
    onSelect,
  ]);
  return (
    <Nav.Item
      {...props}
      renderItem={() => (
        <ItemStyled onClick={handleSelect} active={active}>
          {children}
        </ItemStyled>
      )}
    />
  );
};
