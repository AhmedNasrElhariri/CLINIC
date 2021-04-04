import React from 'react';
import { Icon } from 'rsuite';
import { CRCard, CRTable } from 'components';

function Table({ data, borderLeft, onEdit }) {
  return (
    <>
      <CRCard borderless>
        <CRTable data={data} border={borderLeft}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Type</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="type" bgvariant="success" />
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Timeline</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="timeline" bgvariant="danger" />
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Date</CRTable.CRHeaderCell>
            <CRTable.CRDateCell dataKey="date" />
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
