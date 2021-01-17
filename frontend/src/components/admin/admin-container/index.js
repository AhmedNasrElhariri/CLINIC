import React, { useState } from 'react';

import {
  MainContainer,
  CRCard,
  CRNav,
  BranchesContainer,
  UsersContainer,
  SpecialtiesContainer,
} from 'components';

const AdminContainer = () => {
  const [activeTab, setActiveTab] = useState('branches');

  return (
    <>
      <MainContainer title="Admin" nobody></MainContainer>
      <CRNav
        appearance="tabs"
        activeKey={activeTab}
        onSelect={setActiveTab}
        width={600}
        justified
      >
        <CRNav.CRItem eventKey="branches">Branches</CRNav.CRItem>
        <CRNav.CRItem eventKey="specialties">Specialties</CRNav.CRItem>
        <CRNav.CRItem eventKey="users">Users</CRNav.CRItem>
      </CRNav>
      <CRCard borderless>
        {activeTab === 'branches' && <BranchesContainer />}
        {activeTab === 'specialties' && <SpecialtiesContainer />}
        {activeTab === 'users' && <UsersContainer />}
      </CRCard>
    </>
  );
};

export default AdminContainer;
