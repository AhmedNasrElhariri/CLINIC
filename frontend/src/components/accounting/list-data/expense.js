import React,{useCallback} from 'react';
import NumberFormat from 'react-number-format';
import { H5, CRTable } from 'components';
import { formatDate } from 'utils/date';
import { Icon } from 'rsuite';
import { Can } from 'components/user/can';

const ListData = ({
  title,
  data,
  onEdit,
  currentPage,
  setCurrentPage,
  pages,
}) => {
  const handleSelect = useCallback(
    eventKey => {
      setCurrentPage({ activePage: eventKey });
    },
    [setCurrentPage]
  );
  return (
    <div>
      <H5 mb={3} textAlign="center">
        {title}
      </H5>
      <CRTable autoHeight data={data} cellBordered>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
          <CRTable.CRCell dataKey="name" semiBold />
        </CRTable.CRColumn>
        <CRTable.CRColumn width={100}>
          <CRTable.CRHeaderCell>Type</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ expenseType }) => (
              <CRTable.CRCellStyled bold>{expenseType}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn width={100}>
          <CRTable.CRHeaderCell>Amount</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ amount }) => (
              <CRTable.CRCellStyled bold>
                <NumberFormat
                  value={amount}
                  displayType="text"
                  thousandSeparator
                />
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>

        <CRTable.CRColumn width={130}>
          <CRTable.CRHeaderCell>Date</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ date }) => (
              <CRTable.CRCellStyled>{formatDate(date)}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>

        <CRTable.CRColumn width={35}>
          <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {data => (
              <Can I="EditExpense" an="Accounting">
                <Icon icon="edit" onClick={() => onEdit(data)} />
              </Can>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
      </CRTable>
      <CRTable.CRPagination
        lengthMenu={[
          {
            value: 10,
            label: 10,
          },
          {
            value: 20,
            label: 20,
          },
        ]}
        activePage={currentPage?.activePage}
        pages={pages}
        onSelect={handleSelect}
        // total={appointments.length}
      />
    </div>
  );
};

ListData.propTypes = {};

export default ListData;
