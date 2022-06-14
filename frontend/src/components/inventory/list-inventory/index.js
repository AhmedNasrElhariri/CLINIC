import React from 'react';
import NumberFormat from 'react-number-format';

import { CRTable } from 'components';
import { getUnitOfMeasureShortCut } from 'services/inventory';
import RemoveItem from '../remove-item';
import { useTranslation } from 'react-i18next';

const ListInventory = ({ items }) => {
  const { t } = useTranslation();
  return (
    <CRTable autoHeight data={items}>
      <CRTable.CRColumn flexGrow={1}>
        <CRTable.CRHeaderCell>{t('name')}</CRTable.CRHeaderCell>
        <CRTable.CRCell>
          {({ name, branch, specialty, user, level }) => (
            <CRTable.CRCellStyled>
              {name} {' / '}
              {level}
              {' / '}
              {level === 'organization'
                ? ''
                : level === 'branch'
                ? branch?.name
                : level === 'specialty'
                ? specialty?.name
                : user?.name}
            </CRTable.CRCellStyled>
          )}
        </CRTable.CRCell>
      </CRTable.CRColumn>

      <CRTable.CRColumn flexGrow={1}>
        <CRTable.CRHeaderCell>{t('amount')}</CRTable.CRHeaderCell>
        <CRTable.CRCell dataKey="amount" semiBold>
          {({ amount }) => (
            <CRTable.CRCellStyled semiBold>
              <NumberFormat
                value={amount}
                displayType="text"
                thousandSeparator
              />
            </CRTable.CRCellStyled>
          )}
        </CRTable.CRCell>
      </CRTable.CRColumn>

      <CRTable.CRColumn flexGrow={1}>
        <CRTable.CRHeaderCell>{t('totalQuantity')}</CRTable.CRHeaderCell>
        <CRTable.CRCell>
          {({ quantity, item }) => (
            <CRTable.CRCellStyled semiBold>
              <NumberFormat
                value={quantity}
                displayType="text"
                thousandSeparator
              />
              <span display="inline" ml={2}>
                {getUnitOfMeasureShortCut(item.unitOfMeasure)}
              </span>
            </CRTable.CRCellStyled>
          )}
        </CRTable.CRCell>
      </CRTable.CRColumn>
      <CRTable.CRColumn flexGrow={1}>
        <CRTable.CRHeaderCell>{t('doctor')}</CRTable.CRHeaderCell>
        <CRTable.CRCell>
          {({ user }) => (
            <CRTable.CRCellStyled>{user?.name}</CRTable.CRCellStyled>
          )}
        </CRTable.CRCell>
      </CRTable.CRColumn>
      <CRTable.CRColumn flexGrow={0.8}>
        <CRTable.CRHeaderCell>{t('specialty')}</CRTable.CRHeaderCell>
        <CRTable.CRCell>
          {({ specialty }) => (
            <CRTable.CRCellStyled>{specialty?.name}</CRTable.CRCellStyled>
          )}
        </CRTable.CRCell>
      </CRTable.CRColumn>
      <CRTable.CRColumn flexGrow={0.8}>
        <CRTable.CRHeaderCell>{t('branch')}</CRTable.CRHeaderCell>
        <CRTable.CRCell>
          {({ branch }) => (
            <CRTable.CRCellStyled>{branch?.name}</CRTable.CRCellStyled>
          )}
        </CRTable.CRCell>
      </CRTable.CRColumn>
      <CRTable.CRColumn width={35}>
        <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
        <CRTable.CRCell>{data => <RemoveItem item={data} />}</CRTable.CRCell>
      </CRTable.CRColumn>
    </CRTable>
  );
};

ListInventory.defaultProps = {
  items: [],
};

export default ListInventory;
