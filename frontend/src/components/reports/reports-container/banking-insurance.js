import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BankAccountingContainer,
  InsuranceAccountingContainer,
} from 'components';

import { Nav } from 'rsuite';

const TABS = [
  { key: 'bankAccounting', element: () => <BankAccountingContainer /> },
  {
    key: 'insuranceAccounting',
    element: () => <InsuranceAccountingContainer />,
  },
];

const ReportsContainer = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(TABS[0].key);

  const onSelect = useCallback(k => {
    setActiveTab(k);
  }, []);

  return (
    <>
      <Nav
        onSelect={onSelect}
        className="bg-slate-50 rounded-md text-center my-7"
        justified
        activeKey={activeTab}
      >
        {TABS.map(item => (
          <Nav.Item eventKey={item.key} key={item.key}>
            {t(item.key)}
          </Nav.Item>
        ))}
      </Nav>

      {TABS.map(item => item.key === activeTab && item.element())}
    </>
  );
};

export default memo(ReportsContainer);
