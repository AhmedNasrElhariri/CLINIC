import { CRVNav } from 'components';
import { get } from 'services/local-storage';

export default function Aside({ tabs, activeTab, setActiveTab }) {
  const dir = get('dir');

  const border = '2px solid #eef1f1';
  let borderRight = '';
  let borderLeft = '';
  if (dir === 'ltr') {
    borderRight = border;
    borderLeft = 'none';
  } else {
    borderRight = 'none';
    borderLeft = border;
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
