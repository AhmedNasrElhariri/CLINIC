import { memo, useCallback } from 'react';
import { Nav as RNav } from 'rsuite';
import { TABS } from '.';

function Nav({ activeTab, onSelect, t }) {
  const renderNav = useCallback(
    mobile => (
      <RNav
        activeKey={activeTab}
        onSelect={onSelect}
        appearance="tabs"
        vertical={mobile}
        className={`text-center max-w-5xl mb-5 ${
          mobile ? 'sm:hidden' : 'tw-hidden sm:block'
        }`}
      >
        {TABS.map(o => (
          <RNav.Item key={o.key} eventKey={o.key}>
            {t(o.key)}
          </RNav.Item>
        ))}
      </RNav>
    ),
    [activeTab, onSelect, t]
  );

  return (
    <>
      {renderNav()}
      {renderNav(true)}
    </>
  );
}

export default memo(Nav);
