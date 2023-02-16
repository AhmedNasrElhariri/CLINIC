import { Div, CRTable } from 'components';
import { formatDate } from 'utils/date';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';


const ListSurgries = ({ data, onClick }) => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <Div>
      <CRTable
        autoHeight
        data={data}
        onRowClick={appointment => {
          history.push(`/appointments/${appointment.id}`);
        }}
      >
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('surgery')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ patientSurgeries }) => (
              <CRTable.CRCellStyled>
                {patientSurgeries[0]?.surgery.name}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>

        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('hospital')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ patientSurgeries }) => (
              <CRTable.CRCellStyled>
                {patientSurgeries[0]?.hospital.name}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>

        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('date')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ patientSurgeries }) => (
              <CRTable.CRCellStyled>
                {formatDate(patientSurgeries[0]?.date)}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
      </CRTable>
    </Div>
  );
};

ListSurgries.defaultProps = {
  surgries: [],
};

export default ListSurgries;
