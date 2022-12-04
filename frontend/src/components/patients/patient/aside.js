import { CRVNav } from 'components';
import { useTranslation } from 'react-i18next';

export default function Aside({ tabs, activeTab, setActiveTab }) {
  const { i18n } = useTranslation();
  const border = '2px solid #eef1f1';
  let borderRight = '';
  let borderLeft = '';
  const language = i18n?.language;
  if (language === 'ar') {
    borderRight = 'none';
    borderLeft = border;
  } else {
    borderRight = border;
    borderLeft = 'none';
  }

  return (
    <aside className="tw-hidden sm:block">
      <CRVNav
        appearance="tabs"
        activeKey={activeTab}
        onSelect={setActiveTab}
        justified
        vertical
        borderRight={borderRight}
        borderLeft={borderLeft}
      >
        {tabs.map((t, idx) => (
          <CRVNav.CRItem eventKey={idx + ''} key={idx}>
            {t}
          </CRVNav.CRItem>
        ))}
      </CRVNav>
    </aside>
  );
}
