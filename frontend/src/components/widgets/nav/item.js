import { ifElse } from 'ramda';
import React, { useCallback, useEffect } from 'react';
import { Nav } from 'rsuite';

import { ItemStyled, Line } from './style';
let before = 0;
let length = 0;
const handleBefore = (event, active) => {
  if (active) {
    before = event - 1;
  }
};
export default ({ children, active, onSelect, eventKey, ...props }) => {
  useEffect(() => {
    length = length + 1;
  }, [eventKey]);
  const select = useCallback(e => onSelect(eventKey, e), [eventKey, onSelect]);
  console.log(before);
  return (
    <Nav.Item
      {...props}
      renderItem={() => (
        <ItemStyled onClick={select} active={active}>
          {children}
          {active && eventKey != '0' ? handleBefore(eventKey, active) : ''}
          {!(
            eventKey == before ||
            active ||
            eventKey === 0 ||
            eventKey === length - 1
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
