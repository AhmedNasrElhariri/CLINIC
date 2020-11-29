import React, { useState } from 'react';

import { MainContainer, BranchesContainer, CRCard, CRNav } from 'components';

import Specializations from '../specializations';

const AdminContainer = () => {
  const [activeTab, setActiveTab] = useState('branches');

  return (
    <>
      <MainContainer title="Admin" nobody></MainContainer>
      <CRNav
        appearance="tabs"
        activeKey={activeTab}
        onSelect={setActiveTab}
        width={300}
        justified
      >
        <CRNav.CRItem eventKey="branches">Branches</CRNav.CRItem>
        <CRNav.CRItem eventKey="specializations">Specializations</CRNav.CRItem>
        <CRNav.CRItem eventKey="users">Users</CRNav.CRItem>
      </CRNav>
      <CRCard borderless>
        {activeTab === 'branches' && <BranchesContainer />}
        {activeTab === 'specializations' && <Specializations />}
      </CRCard>
    </>
  );
};

export default AdminContainer;
