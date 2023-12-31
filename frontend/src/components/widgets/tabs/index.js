import React, { useEffect } from 'react';
import CRTab from './tab-item';
import CRContent from './tab-content';
import CRTabsGroup from './tabs-group';
import CRContentGroup from './content-group';
import { CRNav } from 'components';
import useTabs from './use-tabs';
import Context from './context';

const CRTabs = ({ children, onChange }) => {
  const { activeTab, selectTab } = useTabs();
  useEffect(() => {
    onChange && onChange(activeTab);
  }, [activeTab]);
  return (
    <>
      <Context.Provider value={{ onSelect: selectTab, activeTab }}>
        <CRNav appearance="tabs" activeKey={activeTab}>
          {children}
        </CRNav>
      </Context.Provider>
    </>
  );
};

CRTabs.CRTab = CRTab;
CRTabs.CRContent = CRContent;
CRTabs.CRTabsGroup = CRTabsGroup;
CRTabs.CRContentGroup = CRContentGroup;

export default CRTabs;
