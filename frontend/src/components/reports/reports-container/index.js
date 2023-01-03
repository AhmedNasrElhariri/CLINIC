import { memo, useCallback, useMemo, useState } from 'react';

import {
  AccountingContainer,
  BankAccountingContainer,
  InsuranceAccountingContainer,
} from 'components';
import ReportsPrintOut from '../print-reports';
import Reports from '../reports';
import { useTranslation } from 'react-i18next';
import Nav from './nav';

export const TABS = [
  { key: 'cash', element: () => <AccountingContainer /> },
  {
    key: 'bank',
    element: () => <BankAccountingContainer />,
  },
  {
    key: 'insurance',
    element: () => <InsuranceAccountingContainer />,
  },
  { key: 'statistics', element: () => <Reports /> },
  { key: 'reports', element: () => <ReportsPrintOut /> },
];

const ReportsContainer = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].key);
  const { t } = useTranslation();

  const onSelect = useCallback(key => setActiveTab(key), []);

  const activeContent = useMemo(
    () => TABS.find(o => o.key === activeTab).element(),
    [activeTab]
  );

  return (
    <>
      <h1 className="text-2xl mb-4">{t('reports')}</h1>

      <Nav activeTab={activeTab} t={t} onSelect={onSelect} />

      {activeContent}
    </>
  );
};

export default memo(ReportsContainer);
