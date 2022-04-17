import React, { useCallback } from 'react';
import { Icon } from 'rsuite';
import { formatDate } from 'utils/date';
import { STANDARD_DATE_FORMAT } from 'utils/constants';
import { CRCard, CRTable } from 'components';

function ListSaleses({
  saleses,
  onEdit,
  onDelete,
  currentPage,
  setCurrentPage,
  pages,
}) {
  const handleSelect = useCallback(
    eventKey => {
      setCurrentPage({ activePage: eventKey });
    },
    [setCurrentPage]
  );
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={saleses}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Number</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ date }, index) => (
                <CRTable.CRCellStyled bold>{index + 1}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Date</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ date }) => (
                <CRTable.CRCellStyled bold>
                  {formatDate(date, STANDARD_DATE_FORMAT)}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ salesDefinition }) => (
                <CRTable.CRCellStyled bold>
                  {salesDefinition.name}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Creator</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ user }) => (
                <CRTable.CRCellStyled bold>{user?.name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Price</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ salesDefinition }) => (
                <CRTable.CRCellStyled bold>
                  {salesDefinition?.price}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Quantity</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ quantity }) => (
                <CRTable.CRCellStyled bold>{quantity}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Total Price</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ totalPrice }) => (
                <CRTable.CRCellStyled bold>{totalPrice}</CRTable.CRCellStyled>
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
                    Edit
                  </Icon>
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {data => (
                <Icon icon="trash" onClick={() => onDelete(data)}>
                  {' '}
                  Delete
                </Icon>
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

export default ListSaleses;
