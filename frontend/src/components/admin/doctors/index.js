import { MainContainer, CRTabs } from 'components';
import DoctorSessions from './doctor-sessions';
import DoctorFees from './doctor-fees/index';
import { useTranslation } from 'react-i18next';

export default function DoctorContainer() {
  const { t } = useTranslation();

  return (
    <>
      <MainContainer title={t('doctors')} nobody></MainContainer>

      <CRTabs defaultValue={3}>
        <CRTabs.CRTabsGroup>
          <CRTabs.CRTab>{t('doctorFees')}</CRTabs.CRTab>
          <CRTabs.CRTab>{t('doctorSessions')}</CRTabs.CRTab>
        </CRTabs.CRTabsGroup>
        <CRTabs.CRContentGroup>
          <CRTabs.CRContent>
            <DoctorFees />
          </CRTabs.CRContent>
          <CRTabs.CRContent>
            <DoctorSessions />
          </CRTabs.CRContent>
        </CRTabs.CRContentGroup>
      </CRTabs>
    </>
  );
}

DoctorContainer.propTypes = {};

DoctorContainer.defaultProps = {};
