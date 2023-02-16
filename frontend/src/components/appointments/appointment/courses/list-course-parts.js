import { CRCard, CRTable } from 'components';

function ListCourseParts({ parts, t }) {
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={parts}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('name')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ part }) => (
                <CRTable.CRCellStyled bold>{part.name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('unitPrice')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ unitPrice }) => (
                <CRTable.CRCellStyled bold>{unitPrice.toFixed(2)}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('remainingUnits')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ remainingUnits }) => (
                <CRTable.CRCellStyled bold>
                  {remainingUnits}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('totalUnits')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ totalUnits }) => (
                <CRTable.CRCellStyled bold>{totalUnits}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}

export default ListCourseParts;
