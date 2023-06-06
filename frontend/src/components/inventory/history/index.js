import { useState, useRef } from 'react';
import { CRButton } from 'components';
import { useInventory } from 'hooks';
import { useTranslation } from 'react-i18next';
import ReactToPrint from 'react-to-print';
import Filter from './filter';
import ListHistory from './list-history';

const initalValue = {
  itemId: null,
};
const inialCurrentPage = {
  activePage: 1,
};

const InventoryHistory = () => {
  const [formValue, setFormValue] = useState(initalValue);
  const [period, setPeriod] = useState([]);
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const { history, items, inventoryPages } = useInventory({
    itemId: formValue?.itemId,
    dateFrom: period[0],
    dateTo: period[1],
    page: currentPage?.activePage,
  });
  const ref = useRef();
  const { t } = useTranslation();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl mb-4">{t('history')}</h1>

        <ReactToPrint
          trigger={() => (
            <CRButton primary mb={20}>
              {t('print')}
            </CRButton>
          )}
          content={() => ref.current}
        />
      </div>
      <Filter
        formValue={formValue}
        setFormValue={setFormValue}
        setPeriod={setPeriod}
        t={t}
        items={items}
      />
      <ListHistory
        history={history}
        t={t}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pages={inventoryPages}
      />
    </>
  );
};

export default InventoryHistory;
