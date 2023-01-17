import { CRCard, CRTable } from 'components';
import { Icon } from 'rsuite';
const ListParts = ({ parts, onDeletePart, t }) => {
  return (
    <CRCard borderless>
      <CRTable autoHeight data={parts}>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('name')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ doctor }) => (
              <CRTable.CRCellStyled bold>{doctor.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('part')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ part }) => (
              <CRTable.CRCellStyled bold>{part.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>
            {t('feesCalculationMethod')}
          </CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ feesCalculationMethod }) => (
              <CRTable.CRCellStyled bold>
                {feesCalculationMethod}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>
            {t('feesCalculationType')}
          </CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ feesCalculationType }) => (
              <CRTable.CRCellStyled bold>
                {feesCalculationType}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('fees')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ fees, feesCalculationType }) => (
              <CRTable.CRCellStyled bold>
                {fees}
                {feesCalculationType === 'percentage' ? '%' : ''}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>

        <CRTable.CRColumn>
          <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {data => (
              <Icon icon="trash" onClick={() => onDeletePart(data)}>
                {' '}
                {t('delete')}
              </Icon>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
      </CRTable>
    </CRCard>
  );
};
export default ListParts;
