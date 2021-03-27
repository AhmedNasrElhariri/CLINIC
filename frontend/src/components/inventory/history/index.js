import React from 'react';
import { CRTable, MainContainer } from 'components';
import { formatFullDay } from 'utils/date';
import Print from '../print';
import { useInventory } from 'hooks';

const InventoryHistory = () => {
  const { history } = useInventory();
  return (
    <>
      <MainContainer
        title="History"
        nobody
        more={<Print history={history} />}
      ></MainContainer>
      <CRTable autoHeight data={history}>
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
