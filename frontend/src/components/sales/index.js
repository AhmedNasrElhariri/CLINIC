import { useCallback, useState } from 'react';
import { Nav } from 'rsuite';
import SalesContainer from './sales-container';
import SalesHistory from './list-history-data';
import { useTranslation } from 'react-i18next';
import { useInventory } from 'hooks';
const Sales = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();

  const { history } = useInventory({
    isSelling: true,
  });

  return (
    <>
      <h1 className="text-2xl mb-10">{t('sales')}</h1>
      <Nav
        activeKey={activeIndex}
        onSelect={i => {
          setActiveIndex(i);
        }}
        appearance="tabs"
        justified
        className="text-center max-w-5xl mb-5"
      >
        <Nav.Item eventKey={0}>{t('salesContainer')}</Nav.Item>
        <Nav.Item eventKey={1}>{t('salesHistory')}</Nav.Item>
      </Nav>
      {activeIndex === 0 && <SalesContainer t={t} />}
      {activeIndex === 1 && <SalesHistory t={t} data={history} />}
    </>
  );
};

export default Sales;
