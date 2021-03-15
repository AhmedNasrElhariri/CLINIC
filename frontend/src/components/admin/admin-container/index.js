import React, { useState } from 'react';

import {
  MainContainer,
  CRCard,
  CRNav,
  BranchesContainer,
  UsersContainer,
  SpecialtiesContainer,
  Assign,
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
        width="100%"
        justified
      >
        <CRNav.CRItem eventKey="branches">Branches</CRNav.CRItem>
        <CRNav.CRItem eventKey="specialties">Specialties</CRNav.CRItem>
        <CRNav.CRItem eventKey="users">Users</CRNav.CRItem>
        <CRNav.CRItem eventKey="rolePermission">Role Permission</CRNav.CRItem>
      </CRNav>
      <CRCard borderless>
        {activeTab === 'branches' && <BranchesContainer />}
        {activeTab === 'specialties' && <SpecialtiesContainer />}
        {activeTab === 'users' && <UsersContainer />}
        {activeTab === 'rolePermission' && <Assign />}
      </CRCard>
    </>
  );
};

export default AdminContainer;
