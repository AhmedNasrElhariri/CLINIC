import React,{useCallback} from 'react';
import { CRCard, CRTable } from 'components';
import { formatDate } from 'utils/date';

function ListLogging({
  t,
  loggings,
  currentPage,
  setCurrentPage,
  loggingCount,
  pages,
}) {
  const handleSelect = useCallback(
    eventKey => {
      setCurrentPage({ activePage: eventKey });
    },
    [setCurrentPage]
  );
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={loggings}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('date')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ date }) => (
                <CRTable.CRCellStyled bold>
                  {formatDate(date, 'dddd, DD-MM-YYYY')}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('user')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ user }) => (
                <CRTable.CRCellStyled bold>{user.name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('action')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ text }) => (
                <CRTable.CRCellStyled bold>{text}</CRTable.CRCellStyled>
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
          total={loggingCount}
        />
      </CRCard>
    </>
  );
}

export default ListLogging;
