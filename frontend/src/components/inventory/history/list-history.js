import { useCallback } from 'react';
import { CRCard, CRTable } from 'components';
import { formatFullDay } from 'utils/date';

const ListHistory = ({ t, history, setCurrentPage, currentPage, pages }) => {
  const handleSelect = useCallback(
    eventKey => {
      setCurrentPage({ activePage: eventKey });
    },
    [setCurrentPage]
  );
  return (
    <CRCard borderless>
      <CRTable data={history} autoHeight>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('date')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ date }) => (
              <CRTable.CRCellStyled bold>
                {formatFullDay(date)}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>

        <CRTable.CRColumn flexGrow={3}>
          <CRTable.CRHeaderCell>{t('body')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ body }) => (
              <CRTable.CRCellStyled bold>{body}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('oldNoOfBoxes')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ oldNoOfBoxes }) => (
              <CRTable.CRCellStyled bold>{oldNoOfBoxes}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('newNoOfBoxes')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ newNoOfBoxes }) => (
              <CRTable.CRCellStyled bold>{newNoOfBoxes}</CRTable.CRCellStyled>
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
      />
    </CRCard>
  );
};
export default ListHistory;
