import React from 'react';
import { formatDate } from 'utils/date';
import { CRCard, CRTable } from 'components';
import { Icon } from 'rsuite';

function ListFaceOperations({ operations, onDelete }) {
  return (
    <>
      <CRCard borderless>
        <CRTable
          autoHeight
          data={operations}
          style={{ marginTop: '20px' }}
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
            <CRTable.CRHeaderCell>Face Partation Number</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ facePartation }) => (
                <CRTable.CRCellStyled bold>
                  {facePartation.number}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Face Partation Name</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ facePartation }) => (
                <CRTable.CRCellStyled bold>
                  {facePartation.name}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Material Name</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ material }) => (
                <CRTable.CRCellStyled bold>
                  {material.name}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Material Units</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ units }) => (
                <CRTable.CRCellStyled bold>
                  {units}
                </CRTable.CRCellStyled>
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

export default ListFaceOperations;
