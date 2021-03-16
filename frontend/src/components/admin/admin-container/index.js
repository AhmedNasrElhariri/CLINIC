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
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <MainContainer title="Admin" nobody></MainContainer>
      <CRNav appearance="tabs" activeKey={activeTab} onSelect={setActiveTab}>
        <CRNav.CRItem eventKey={0}>Branches</CRNav.CRItem>
        <CRNav.CRItem eventKey={1}>Specialties</CRNav.CRItem>
        <CRNav.CRItem eventKey={2}>Users</CRNav.CRItem>
        <CRNav.CRItem eventKey={3}>Role Permission</CRNav.CRItem>
      </CRNav>
      <CRCard borderless>
        {activeTab === 0 && <BranchesContainer />}
        {activeTab === 1 && <SpecialtiesContainer />}
        {activeTab === 2 && <UsersContainer />}
        {activeTab === 3 && <Assign />}
      </CRCard>
    </>
  );
};

export default AdminContainer;
