import React from 'react';
import PropTypes from 'prop-types';

import { CRNav } from 'components';

const Tabs = ({ activeTab, onSelect }) => {
  return (
    <CRNav appearance="tabs" activeKey={activeTab} onSelect={onSelect}>
      <CRNav.CRItem eventKey="0">Details</CRNav.CRItem>
      <CRNav.CRItem eventKey="1">Summary</CRNav.CRItem>
    </CRNav>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Tabs;
