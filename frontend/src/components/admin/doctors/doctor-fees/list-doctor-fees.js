import { formatDate } from 'utils/date';
import { CRCard, CRTable, Total } from 'components';
import { FULL_DAY_FORMAT } from 'utils/constants';
import { useCallback } from 'react';
import { Icon } from 'rsuite';
const ListDoctorFees = ({
  fees,
  t,
  total,
  setCurrentPage,
  currentPage,
  pages,
  onEdit,
}) => {
  const handleSelect = useCallback(
    eventKey => {
      setCurrentPage(eventKey);
    },
    [setCurrentPage]
  );
  return (
    <>
      <CRCard borderless mb="20px">
        <CRTable autoHeight data={fees}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('date')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ date }) => (
                <CRTable.CRCellStyled bold>
                  {formatDate(date, FULL_DAY_FORMAT)}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('name')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ name }) => (
                <CRTable.CRCellStyled bold>{name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('amount')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ amount }) => (
                <CRTable.CRCellStyled bold>{amount}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('doctor')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ doctor }) => (
                <CRTable.CRCellStyled bold>{doctor.name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {data => (
                <CRTable.CRCellStyled bold>
                  <Icon icon="edit" onClick={() => onEdit(data)}>
                    {' '}
                    {t('edit')}
                  </Icon>
                </CRTable.CRCellStyled>
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
          activePage={currentPage}
          pages={pages}
          onSelect={handleSelect}
          // total={}
        />
      </CRCard>
      <Total total={total} />
    </>
  );
};
export default ListDoctorFees;
