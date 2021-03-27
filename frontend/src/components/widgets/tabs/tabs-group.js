import React, { useContext } from 'react';

import Context from './context';
import { LineStyled, LineContainerStyled } from './style';

const Line = () => (
  <LineContainerStyled>
    <LineStyled />
  </LineContainerStyled>
);

const TabsGroup = ({ eventKey, children }) => {
  const { onSelect, activeTab } = useContext(Context);
  const count = React.Children.count(children);

  const hideLine = idx =>
    idx + 1 === count || activeTab === idx || activeTab === idx + 1;
  return (
    <>
      {React.Children.map(children, (child, idx) => (
        <React.Fragment key={idx}>
          {React.cloneElement(child, {
            eventKey1: idx,
            onSelect: () => onSelect(idx),
            active: activeTab === idx,
          })}
          {!hideLine(idx) && <Line />}
        </React.Fragment>
      ))}
    </>
  );
};

export default TabsGroup;
