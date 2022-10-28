import React, { useState, useMemo } from 'react';
import { CRTable, CRSelectInput } from 'components';
import { formatFullDay } from 'utils/date';
import { Form, Table } from 'rsuite';
import Print from '../print';
import { useInventory } from 'hooks';
import { useTranslation } from 'react-i18next';

const { Cell, Column } = Table;

const initalValue = {
  item: '',
};
const InventoryHistory = () => {
  const { history, items } = useInventory();
  const { t } = useTranslation();
  const [formValue, setFormValue] = useState(initalValue);
  const newItems = items.map(i => {
    return {
      id: i.name,
      name: i.name,
    };
  });
  const newHistory = useMemo(
    () =>
      history.filter(h =>
        h.body.toLowerCase().includes(formValue.item.toLowerCase())
      ),
    [formValue, history]
  );
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl mb-4">{t('history')}</h1>
        <Print history={newHistory} />
      </div>
      <Form formValue={formValue} onChange={setFormValue} className="mt-2 mb-7">
        <CRSelectInput
          label={t('item')}
          name="item"
          data={newItems}
          onChange={val =>
            val == null ? setFormValue({ ...formValue, item: '' }) : ''
          }
          style={{ width: '300px' }}
        />
      </Form>
      <Table autoHeight data={newHistory} wordWrap>
        <Column flexGrow={1}>
          <CRTable.CRHeaderCell>{t('date')}</CRTable.CRHeaderCell>
          <Cell semiBold>
            {({ date }) => <span>{formatFullDay(date)}</span>}
          </Cell>
        </Column>

        <Column flexGrow={1}>
          <CRTable.CRHeaderCell>{t('actions')}</CRTable.CRHeaderCell>
          <Cell dataKey="body" semiBold />
        </Column>
      </Table>
    </>
  );
};

export default InventoryHistory;
