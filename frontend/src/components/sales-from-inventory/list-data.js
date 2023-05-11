import { CRTable } from 'components';
import { Table } from 'rsuite';
import { formatFullDay } from 'utils/date';

const { Cell, Column } = Table;

const ListData = ({ data, t }) => {
  return (
    <>
      <Table autoHeight data={data} wordWrap>
        <Column flexGrow={1}>
          <CRTable.CRHeaderCell>{t('date')}</CRTable.CRHeaderCell>
          <Cell semiBold>
            {({ date }) => <span>{formatFullDay(date)}</span>}
          </Cell>
        </Column>

        <Column flexGrow={1}>
          <CRTable.CRHeaderCell>{t('actions')}</CRTable.CRHeaderCell>
          <Cell dataKey="body" semiBold />
        </Column>
      </Table>
    </>
  );
};
export default ListData;
