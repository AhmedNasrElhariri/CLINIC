import { useCallback } from 'react';
import { formatDate } from 'utils/date';
import { STANDARD_DATE_FORMAT } from 'utils/constants';
import { CRCard, CRTable } from 'components';
import { useTranslation } from 'react-i18next';

function ListSaleses({ saleses, currentPage, setCurrentPage, pages }) {
  const { t } = useTranslation();
  const handleSelect = useCallback(
    eventKey => {
      setCurrentPage({ activePage: eventKey });
    },
    [setCurrentPage]
  );
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={saleses}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('number')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ date }, index) => (
                <CRTable.CRCellStyled bold>{index + 1}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('date')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ date }) => (
                <CRTable.CRCellStyled bold>
                  {formatDate(date, STANDARD_DATE_FORMAT)}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('name')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ item }) => (
                <CRTable.CRCellStyled bold>{item.name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('creator')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ user }) => (
                <CRTable.CRCellStyled bold>{user?.name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('quantity')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ quantity }) => (
                <CRTable.CRCellStyled bold>{quantity}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('totalPrice')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ totalPrice }) => (
                <CRTable.CRCellStyled bold>{totalPrice}</CRTable.CRCellStyled>
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
      </CRCard>
    </>
  );
}

export default ListSaleses;
