import React, { useCallback } from 'react';
import { H5, CRTable } from 'components';
import { Can } from 'components/user/can';
import { formatDate } from 'utils/date';
import { Icon } from 'rsuite';
import { useTranslation } from 'react-i18next';

const ListData = ({
  title,
  data,
  onEdit,
  currentPage,
  setCurrentPage,
  pages,
}) => {
  const { t } = useTranslation();
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
          <CRTable.CRHeaderCell>{t('name')}</CRTable.CRHeaderCell>
          <CRTable.CRCell dataKey="name" semiBold />
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Payer</CRTable.CRHeaderCell>
          <CRTable.CRCell dataKey="payer" semiBold />
        </CRTable.CRColumn>
        <CRTable.CRColumn width={100}>
          <CRTable.CRHeaderCell>{t('revenueAmount')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ amount }) => (
              <CRTable.CRCellStyled bold>
                {/* <NumberFormat
                  value={amount}
                  displayType="text"
                  thousandSeparator
                /> */}
                {amount}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>

        <CRTable.CRColumn width={130}>
          <CRTable.CRHeaderCell>{t('date')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ date }) => (
              <CRTable.CRCellStyled>{formatDate(date)}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn width={130}>
          <CRTable.CRHeaderCell>{t('checkNo')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ checkNumber }) => (
              <CRTable.CRCellStyled>{checkNumber}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>

        <CRTable.CRColumn width={35}>
          <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {data => (
              <Can I="EditBankRevenue" an="Accounting">
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
