import React from 'react';

import {
  MainContainer,
  BranchesContainer,
  UsersContainer,
  SpecialtiesContainer,
  Assign,
  CRTabs,
} from 'components';

const AdminContainer = () => {
  return (
    <>
      <MainContainer title="Admin" nobody></MainContainer>
      <CRTabs>
        <CRTabs.CRTabsGroup>
          <CRTabs.CRTab>Branches</CRTabs.CRTab>
          <CRTabs.CRTab>Specialties</CRTabs.CRTab>
          <CRTabs.CRTab>Users</CRTabs.CRTab>
          <CRTabs.CRTab>Role Permission</CRTabs.CRTab>
        </CRTabs.CRTabsGroup>
        <CRTabs.CRContentGroup>
          <CRTabs.CRContent>
            <BranchesContainer />
          </CRTabs.CRContent>
          <CRTabs.CRContent>
            <SpecialtiesContainer />
          </CRTabs.CRContent>
          <CRTabs.CRContent>
            <UsersContainer />
          </CRTabs.CRContent>
          <CRTabs.CRContent>
            <Assign />
          </CRTabs.CRContent>
        </CRTabs.CRContentGroup>
      </CRTabs>
    </>
  );
};

export default AdminContainer;
