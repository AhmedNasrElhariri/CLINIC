import { formatDate } from 'utils/date';
import { CRCard, CRTable, Total } from 'components';
import { FULL_DAY_FORMAT } from 'utils/constants';
import { useCallback } from 'react';
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
const ListDoctorFees = ({
  fees,
  t,
  total,
  setCurrentPage,
  currentPage,
  pages,
  onEdit,
  checkedKeys,
  setCheckedKeys,
  filter,
  totalPrice,
  totalCost,
}) => {
  let checked = false;
  let indeterminate = false;
  if (checkedKeys?.length === fees?.length) {
    checked = true;
  } else if (checkedKeys?.length === 0) {
    checked = false;
  } else if (checkedKeys?.length > 0 && checkedKeys?.length < fees?.length) {
    indeterminate = true;
  }

  const handleCheckAll = (value, checked) => {
    const keys = checked ? fees.map(item => item.id) : [];
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
      setCurrentPage(eventKey);
    },
    [setCurrentPage]
  );
  const totals = {
    total: total,
    totalCost: totalCost,
    totalPrice: totalPrice,
  };
  return (
    <>
      <CRCard borderless mb="20px">
        <CRTable autoHeight data={fees}>
          {(filter?.status === 'Draft' || filter?.status === 'Cleared') && (
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
          )}

          <CRTable.CRColumn flexGrow={2}>
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
                <CRTable.CRCellStyled bold>
                  {Math.round((amount + Number.EPSILON) * 100) / 100}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('unitPrice')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ unitPrice }) => (
                <CRTable.CRCellStyled bold>
                  {unitPrice &&
                    Math.round((unitPrice + Number.EPSILON) * 100) / 100}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('numberOfUnits')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ numberOfUnits }) => (
                <CRTable.CRCellStyled bold>
                  {numberOfUnits}{' '}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('cost')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ cost }) => (
                <CRTable.CRCellStyled bold>{cost}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('sessionPrice')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ totalPrice }) => (
                <CRTable.CRCellStyled bold>
                  {Math.round((totalPrice + Number.EPSILON) * 100) / 100}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
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
      <Total totals={totals} />
    </>
  );
};
export default ListDoctorFees;
