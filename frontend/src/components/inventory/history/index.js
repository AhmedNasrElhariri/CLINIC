import React, { useState, useMemo } from 'react';
import { CRTable, MainContainer, Div, CRSelectInput } from 'components';
import { formatFullDay } from 'utils/date';
import { Form } from 'rsuite';
import Print from '../print';
import { useInventory } from 'hooks';
const initalValue = {
  item: '',
};
const InventoryHistory = () => {
  const { history, items } = useInventory();
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
      <MainContainer
        title="History"
        nobody
        more={<Print history={newHistory} />}
      ></MainContainer>
      <Div mb={30} ml={300}>
        <Form formValue={formValue} onChange={setFormValue}>
          <CRSelectInput
            label="Item"
            name="item"
            data={newItems}
            onChange={val => val == null ? setFormValue({...formValue,item:''}):''}
            style={{ width: '300px' }}
          />
        </Form>
      </Div>
      <CRTable autoHeight data={newHistory}>
        <CRTable.CRColumn width={250}>
          <CRTable.CRHeaderCell>Date</CRTable.CRHeaderCell>
          <CRTable.CRCell semiBold>
            {({ date }) => (
              <CRTable.CRCellStyled>{formatFullDay(date)}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>

        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Action</CRTable.CRHeaderCell>
          <CRTable.CRCell dataKey="body" semiBold />
        </CRTable.CRColumn>
      </CRTable>
    </>
  );
};

export default InventoryHistory;
