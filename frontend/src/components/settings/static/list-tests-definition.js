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
            <CRTable.CRCell dataKey="name" semiBold />
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Category Name</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="category" semiBold />
          </CRTable.CRColumn>
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {data => (
                <Icon
                  icon="edit"
                  onClick={() => onEdit(data)}
                  style={{
                    fontSize: 17,
                    padding: '15px',
                    backgroundColor: '#eef1f1',
                    paddingRight: '40px',
                    marginLeft: '1px',
                  }}
                >
                  {' '}
                  Edit
                </Icon>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {data => (
                <Icon
                  icon="trash"
                  onClick={() => onEdit(data)}
                  style={{
                    fontSize: 17,
                    padding: '15px',
                    backgroundColor: '#eef1f1',
                    paddingRight: '40px',
                    marginLeft: '1px',
                  }}
                >
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
