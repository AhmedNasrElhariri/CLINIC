import React from 'react';
import { Div, CRTable } from 'components';
import { formatDate } from 'utils/date';
import { useTranslation } from 'react-i18next';

const ListSurgries = ({ surgeries, onClick }) => {
  const { t } = useTranslation();
  return (
    <Div>
      <CRTable autoHeight data={surgeries} onRowClick={onClick}>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('surgery')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ surgery }) => (
              <CRTable.CRCellStyled>{surgery.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>

        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('hospital')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ hospital }) => (
              <CRTable.CRCellStyled>{hospital.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>

        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('date')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ date }) =>
              date ? (
                <CRTable.CRCellStyled>{formatDate(date)}</CRTable.CRCellStyled>
              ) : null
            }
          </CRTable.CRCell>
        </CRTable.CRColumn>
      </CRTable>
    </Div>
  );
};

ListSurgries.defaultProps = {
  surgries: [],
};

export default ListSurgries;
