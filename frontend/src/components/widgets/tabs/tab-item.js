import React from 'react';
import { CRNav } from 'components';

const TabItem = ({ children, ...props }) => {
  return <CRNav.CRItem {...props}>{children}</CRNav.CRItem>;
};

export default TabItem;
