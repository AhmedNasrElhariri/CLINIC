<<<<<<< HEAD
import React, { useCallback } from 'react';
=======
import { ifElse } from 'ramda';
import React, { useCallback, useEffect } from 'react';
>>>>>>> b85e74ee9fe28171fc93d60a4343b9a63d5739de
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
<<<<<<< HEAD
  console.log(children);
=======
  useEffect(() => {
    length = length + 1;
  }, [eventKey]);
>>>>>>> b85e74ee9fe28171fc93d60a4343b9a63d5739de
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
            eventKey === before ||
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
