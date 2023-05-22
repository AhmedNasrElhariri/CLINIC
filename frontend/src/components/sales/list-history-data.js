import { CRTable, CRCard } from 'components';
import { formatFullDay } from 'utils/date';

const ListData = ({ data, t }) => {
  return (
    <CRCard borderless>
      <CRTable data={data} autoHeight>
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

        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('body')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ body }) => (
              <CRTable.CRCellStyled bold>{body}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
      </CRTable>
    </CRCard>
  );
};
export default ListData;
