import React from 'react';

import {
  MainContainer,
  BranchesContainer,
  UsersContainer,
  DoctorsContainer,
  SpecialtiesContainer,
  Assign,
  CRTabs,
} from 'components';
import { useTranslation } from 'react-i18next';

const AdminContainer = () => {
  const { t } = useTranslation();
  return (
    <>
      <MainContainer title={t('admin')} nobody></MainContainer>
      <CRTabs defaultValue={3}>
        <CRTabs.CRTabsGroup>
          <CRTabs.CRTab>{t('branches')}</CRTabs.CRTab>
          <CRTabs.CRTab>{t('specialties')}</CRTabs.CRTab>
          <CRTabs.CRTab>{t('users')}</CRTabs.CRTab>
          <CRTabs.CRTab>{t('doctors')}</CRTabs.CRTab>
          <CRTabs.CRTab>{t('rolePermission')}</CRTabs.CRTab>
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
            <DoctorsContainer />
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
