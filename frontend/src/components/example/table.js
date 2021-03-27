import React from 'react';
import { Icon } from 'rsuite';
import { CRCard, CRTable } from 'components';

function Table({ data, borderLeft, onEdit }) {
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={data} border={borderLeft}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell semiBold>
              {({ patientName }) => (
                <CRTable.CRCellStyled bold>{patientName}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Status</CRTable.CRHeaderCell>
            <CRTable.CRCell semiBold>
              {({ status }) => (
                <CRTable.CRCellStyled bold>{status}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Type</CRTable.CRHeaderCell>
            <CRTable.CRCell semiBold>
              {({ type }) => (
                <CRTable.CRCellStyled bold>{type}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Timeline</CRTable.CRHeaderCell>
            <CRTable.CRCell semiBold>
              {({ timeline }) => (
                <CRTable.CRCellStyled bold>{timeline}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell semiBold>
              {({ date }) => (
                <CRTable.CRCellStyled bold>{date}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Doctor</CRTable.CRHeaderCell>
            <CRTable.CRCell semiBold>
              {({ doctor }) => (
                <CRTable.CRCellStyled bold>{doctor}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Actions</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {data => (
                <>
                  <CRTable.CRCellStyled bold>
                    <Icon icon="edit" onClick={() => onEdit(data)}>
                      {' '}
                      Print
                    </Icon>
                  </CRTable.CRCellStyled>
                  <CRTable.CRCellStyled bold>
                    <Icon icon="edit" onClick={() => onEdit(data)}>
                      {' '}
                      Edit
                    </Icon>
                  </CRTable.CRCellStyled>
                </>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}

export default Table;
