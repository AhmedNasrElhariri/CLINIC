import React, { useCallback } from 'react';
import NumberFormat from 'react-number-format';
import { H5, CRTable } from 'components';
import { formatDate } from 'utils/date';
import { useTranslation } from 'react-i18next';
import { Icon, Checkbox, Table } from 'rsuite';

const { Cell } = Table;
const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0, top: '-2px' }}>
    <div style={{ lineHeight: '46px' }}>
      <Checkbox
        value={rowData[dataKey]}
        inline
        onChange={onChange}
        checked={checkedKeys?.some(item => item === rowData[dataKey])}
      />
    </div>
  </Cell>
);

const ListData = ({
  title,
  data,
  canEdit,
  currentPage,
  setCurrentPage,
  pages,
  checkedKeys,
  setCheckedKeys,
  onEditInsurance,
}) => {
  const { t } = useTranslation();
  let checked = false;
  let indeterminate = false;
  if (checkedKeys?.length === data?.length) {
    checked = true;
  } else if (checkedKeys?.length === 0) {
    checked = false;
  } else if (checkedKeys?.length > 0 && checkedKeys?.length < data?.length) {
    indeterminate = true;
  }

  const handleCheckAll = (value, checked) => {
    const keys = checked ? data.map(item => item.id) : [];
    setCheckedKeys(keys);
  };
  const handleCheck = (value, checked) => {
    const keys = checked
      ? [...checkedKeys, value]
      : checkedKeys.filter(item => item !== value);
    setCheckedKeys(keys);
  };
  const handleSelect = useCallback(
    eventKey => {
      setCurrentPage({ activePage: eventKey });
    },
    [setCurrentPage]
  );
  return (
    <div>
      <H5 mb={3} textAlign="center">
        {title}
      </H5>
      <CRTable autoHeight data={data} cellBordered>
        <CRTable.CRColumn width={50} align="center">
          <CRTable.CRHeaderCell style={{ padding: 0 }}>
            <div style={{ lineHeight: '40px' }}>
              <Checkbox
                inline
                checked={checked}
                indeterminate={indeterminate}
                onChange={handleCheckAll}
              />
            </div>
          </CRTable.CRHeaderCell>
          <CheckCell
            dataKey="id"
            checkedKeys={checkedKeys}
            onChange={handleCheck}
            onClick={event => event.stopPropagation()}
          />
        </CRTable.CRColumn>
        {/* <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('name')}</CRTable.CRHeaderCell>
          <CRTable.CRCell dataKey="name" semiBold />
        </CRTable.CRColumn> */}
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('name')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ companySession }) => (
              <CRTable.CRCellStyled bold>
                {companySession?.name}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('patient')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ patient }) => (
              <CRTable.CRCellStyled bold>
                {patient?.name}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        {/* <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('payer')}</CRTable.CRHeaderCell>
          <CRTable.CRCell dataKey="payer" semiBold />
        </CRTable.CRColumn> */}

        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('revenueAmount')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ amount }) => (
              <CRTable.CRCellStyled bold>
                <NumberFormat
                  value={amount}
                  displayType="text"
                  thousandSeparator
                />
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        {/* <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('session')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ companySession }) => (
              <CRTable.CRCellStyled bold>
                {companySession?.name}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn> */}
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('companyName')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ company }) => (
              <CRTable.CRCellStyled bold>{company.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('cardNo')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ cardId }) => (
              <CRTable.CRCellStyled bold>{cardId}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>

        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('date')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ date }) => (
              <CRTable.CRCellStyled>{formatDate(date)}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>

        <CRTable.CRColumn width={35}>
          <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {data => <Icon icon="edit" onClick={() => onEditInsurance(data)} />}
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
    </div>
  );
};

ListData.propTypes = {};

export default ListData;
