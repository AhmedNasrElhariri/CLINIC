import React from 'react';
import { Icon } from 'rsuite';

import { CRCard, CRTable } from 'components';

function ListAppointmentTypes({
  appointmentTypes,
  setAppointmentType,
  setShowAppointmentTypeData,
  onEdit,
  onDelete,
}) {
  return (
    <>
      <CRCard borderless>
        <CRTable
          autoHeight
          data={appointmentTypes}
          // onRowClick={appointmentType => {
          //   setAppointmentType(appointmentType);
          //   setShowAppointmentTypeData(true);
          // }}
        >
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Appointment Type Name</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ name }) => (
                <CRTable.CRCellStyled bold>{name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Urgent</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ urgent }) => (
                <CRTable.CRCellStyled bold>
                  {urgent ? 'Yes' : 'No'}
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
      </CRCard>
    </>
  );
}

export default ListAppointmentTypes;
