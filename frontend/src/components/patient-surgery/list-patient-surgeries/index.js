import { useCallback } from 'react';
import NumberFormat from 'react-number-format';
import { useTranslation } from 'react-i18next';
import { CRCard, CRTable } from 'components';
import { formatDate } from 'utils/date';
import { FULL_DAY_FORMAT } from 'utils/constants';
import { Icon } from 'rsuite';
import { Can } from 'components/user/can';

function ListPatientSurgeries({
  patientSurgeries,
  onSurgeryClick,
  currentPage,
  setCurrentPage,
  pages,
  onEdit,
}) {
  const { t } = useTranslation();
  const handleSelect = useCallback(
    eventKey => {
      setCurrentPage({ activePage: eventKey });
    },
    [setCurrentPage]
  );
  return (
    <>
      <CRCard borderless className="mt-5">
        <CRTable autoHeight data={patientSurgeries} onRowClick={onSurgeryClick}>
          <CRTable.CRColumn minWidth={128} flexGrow={1}>
            <CRTable.CRHeaderCell>{t('patient')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ patient }) => (
                <CRTable.CRCellStyled>{patient.name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>

          <CRTable.CRColumn minWidth={82} flexGrow={2}>
            <CRTable.CRHeaderCell>{t('surgeries')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ surgeries }) => (
                <CRTable.CRCellStyled>
                  {surgeries?.map(({ name }, indx) =>
                    surgeries[indx + 1] ? `${name} +` : name
                  )}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>

          <CRTable.CRColumn minWidth={108} flexGrow={1}>
            <CRTable.CRHeaderCell>{t('hospital')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ hospital }) => (
                <CRTable.CRCellStyled>{hospital.name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>

          <CRTable.CRColumn minWidth={136} flexGrow={1}>
            <CRTable.CRHeaderCell>{t('date')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ date }) =>
                date ? (
                  <CRTable.CRCellStyled>
                    {formatDate(date, FULL_DAY_FORMAT)}
                  </CRTable.CRCellStyled>
                ) : null
              }
            </CRTable.CRCell>
          </CRTable.CRColumn>

          <CRTable.CRColumn minWidth={64} flexGrow={1}>
            <CRTable.CRHeaderCell>{t('anesthesiaType')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ anesthesia }) => (
                <CRTable.CRCellStyled>{anesthesia}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn minWidth={116} flexGrow={1}>
            <CRTable.CRHeaderCell>
              {t('anesthesiaDoctorName')}
            </CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ anesthesiaDoctorName }) => (
                <CRTable.CRCellStyled>
                  {anesthesiaDoctorName}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>

          <CRTable.CRColumn minWidth={64} flexGrow={1}>
            <CRTable.CRHeaderCell>{t('fees')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ fees }) => (
                <CRTable.CRCellStyled bold>
                  <NumberFormat
                    value={fees}
                    displayType="text"
                    thousandSeparator
                  />
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>

          <CRTable.CRColumn minWidth={64} flexGrow={1}>
            <CRTable.CRHeaderCell>{t('hospitalFees')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ hospitalFees }) => (
                <CRTable.CRCellStyled bold>
                  <NumberFormat
                    value={hospitalFees}
                    displayType="text"
                    thousandSeparator
                  />
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn minWidth={64} flexGrow={1}>
            <CRTable.CRHeaderCell>{t('assistantFees')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ assistantFees }) => (
                <CRTable.CRCellStyled bold>
                  <NumberFormat
                    value={assistantFees}
                    displayType="text"
                    thousandSeparator
                  />
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn minWidth={64} flexGrow={1}>
            <CRTable.CRHeaderCell>{t('anesthesiaFees')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ anesthesiaFees }) => (
                <CRTable.CRCellStyled bold>
                  <NumberFormat
                    value={anesthesiaFees}
                    displayType="text"
                    thousandSeparator
                  />
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn minWidth={64} flexGrow={1}>
            <CRTable.CRHeaderCell>{t('othersFees')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ others }) => (
                <CRTable.CRCellStyled bold>
                  <NumberFormat
                    value={others}
                    displayType="text"
                    thousandSeparator
                  />
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {data => (
                <CRTable.CRCellStyled bold>
                  <Can I="Edit" a="Surgery">
                    <Icon
                      icon="edit"
                      onClick={e => {
                        e.stopPropagation();
                        onEdit(data);
                      }}
                    >
                      {' '}
                      {t('edit')}
                    </Icon>
                  </Can>
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
          activePage={currentPage?.activePage}
          pages={pages}
          onSelect={handleSelect}
          // total={appointments.length}
        />
      </CRCard>
    </>
  );
}

ListPatientSurgeries.defaultProps = {
  patientSurgeries: [],
};

export default ListPatientSurgeries;
