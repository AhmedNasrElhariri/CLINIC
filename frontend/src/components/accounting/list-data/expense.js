import React from 'react';
import NumberFormat from 'react-number-format';
import { H5, CRTable } from 'components';
import { formatDate } from 'utils/date';
import { Icon } from 'rsuite';
import { Can } from 'components/user/can';
import { useTranslation } from 'react-i18next';

const ListData = ({ title, data, onEdit }) => {
  const { t } = useTranslation();
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
        <CRTable.CRColumn width={100}>
          <CRTable.CRHeaderCell>{t('type')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ expenseType }) => (
              <CRTable.CRCellStyled bold>{expenseType}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn width={100}>
          <CRTable.CRHeaderCell>{t('revenueAmount')}</CRTable.CRHeaderCell>
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
          <CRTable.CRHeaderCell>{t('date')}</CRTable.CRHeaderCell>
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
    </div>
  );
};

ListData.propTypes = {};

export default ListData;
