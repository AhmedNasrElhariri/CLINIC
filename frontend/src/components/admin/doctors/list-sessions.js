import { Icon } from 'rsuite';
import { CRCard, CRTable } from 'components';
import { useTranslation } from 'react-i18next';
import Filter from './filter';
export default function Sessions({
  sessions,
  onDeleteSession,
  filter,
  setFilter,
  users,
}) {
  const { t } = useTranslation();

  return (
    <>
      <Filter filter={filter} setFilter={setFilter} doctors={users} t={t} />
      <CRCard borderless>
        <CRTable autoHeight data={sessions}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('name')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ doctor }) => (
                <CRTable.CRCellStyled bold>{doctor.name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('session')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ session }) => (
                <CRTable.CRCellStyled bold>{session.name}</CRTable.CRCellStyled>
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
                <Icon icon="trash" onClick={() => onDeleteSession(data)}>
                  {' '}
                  {t('delete')}
                </Icon>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}
