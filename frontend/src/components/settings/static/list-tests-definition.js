import React from 'react';
import { Icon } from 'rsuite';

import { CRCard, CRTable } from 'components';
import Labs from 'components/labs';
import labTests from 'components/appointments/appointment/lab-tests';

function ListTestsDefinition({ labs, onEdit }) {
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={labs}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Test Name</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ name }) => (
                <CRTable.CRCellStyled bold>{name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Category Name</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ category }) => (
                <CRTable.CRCellStyled bold>{category}</CRTable.CRCellStyled>
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
                <Icon icon="trash" onClick={() => onEdit(data)}>
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

export default ListTestsDefinition;
