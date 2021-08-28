import React from 'react';
import { formatDate } from 'utils/date';
import { CRCard, CRTable } from 'components';
import { Icon } from 'rsuite';

function ListToothTransaction({ toothTransactions, onDelete }) {
  return (
    <>
      <CRCard borderless>
        <CRTable
          autoHeight
          data={toothTransactions}
          style={{ marginTop: '330px' }}
        >
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Number</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ tooth }, index) => (
                <CRTable.CRCellStyled bold>{index + 1}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Tooth Number</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ tooth }) => (
                <CRTable.CRCellStyled bold>
                  {tooth.toothNumber}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Tooth Part Number</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ tooth }) => (
                <CRTable.CRCellStyled bold>
                  {tooth.toothPartNumber}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Tooth Diagnosis</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ dentalDiagnosis }) => (
                <CRTable.CRCellStyled bold>
                  {dentalDiagnosis.name}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Depth</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ depth }) => (
                <CRTable.CRCellStyled bold>{depth}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Date</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ date }) => (
                <CRTable.CRCellStyled bold>
                  {formatDate(date)}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Doctor</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ doctor }) => (
                <CRTable.CRCellStyled bold>{doctor.name}</CRTable.CRCellStyled>
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
      </CRCard>
    </>
  );
}

export default ListToothTransaction;
