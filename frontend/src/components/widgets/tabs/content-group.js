import React, { useContext } from 'react';
import Context from './context';

const CRContentGroup = ({ children }) => {
  const { onSelect, activeTab } = useContext(Context);
  return (
    <>
      {React.Children.map(children, (child, idx) =>
        activeTab === idx
          ? React.cloneElement(child, {
              eventKey1: idx,
              onSelect: () => onSelect(idx),
              active: activeTab === idx,
            })
          : null
      )}
    </>
  );
};

export default CRContentGroup;
