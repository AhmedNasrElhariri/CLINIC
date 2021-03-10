import React from 'react';
import { Icon } from 'rsuite';

import { CRCard, CRTable } from 'components';

function ListMedicines({ medicines, onEdit }) {
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={medicines}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="name" semiBold />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Concentration</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="concentration" semiBold />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Form</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="form" />
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

export default ListMedicines;
