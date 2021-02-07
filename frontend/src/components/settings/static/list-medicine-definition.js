import React from 'react';
import { Icon } from 'rsuite';

import { CRCard, CRTable, CRButton } from 'components';

function ListMedicines({ medicines, onEdit }) {
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={medicines}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Medicine Name</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="medicineName" semiBold />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Concentration</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="concentration" semiBold />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Medicine Form</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="medicineForm" />
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
                    padding: 5,
                    borderRadius: '5px',
                    backgroundColor: 'rgb(224, 224, 222)',
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
                    padding: 5,
                    borderRadius: 5,
                    backgroundColor: 'rgb(224, 224, 222)',
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
