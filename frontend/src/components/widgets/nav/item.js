import React, { useCallback } from 'react';
import { Nav } from 'rsuite';

import { ItemStyled, Line } from './style';

let before = 0;
let handleBefore = event => {
  before = event - 1;
};
export default ({ children, active, onSelect, eventKey, ...props }) => {
  console.log(children);
  const select = useCallback(e => onSelect(eventKey, e), [eventKey, onSelect]);
  return (
    <Nav.Item
      {...props}
      renderItem={() => (
        <ItemStyled onClick={select} active={active}>
          {children}
          {active ? () => handleBefore(eventKey) : ''}
          {!(
            eventKey === before ||
            active ||
            eventKey === '0' ||
            eventKey === '4'
          ) ? (
            <Line></Line>
          ) : (
            <></>
          )}
        </ItemStyled>
      )}
    />
  );
};
