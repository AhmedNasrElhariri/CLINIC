import React from 'react';
import { Icon } from 'rsuite';

import { CRCard, CRTable } from 'components';

function ListHospitals({ hospitals, onEdit }) {
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={hospitals}>
        <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ name }) => (
                <CRTable.CRCellStyled bold>{name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Phone</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ phoneNo }) => (
                <CRTable.CRCellStyled bold>{phoneNo}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Address</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ address }) => (
                <CRTable.CRCellStyled bold>{address}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Hospital Level</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ level }) => (
                <CRTable.CRCellStyled bold>{level}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Hospital Branch</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ branch }) => (
                <CRTable.CRCellStyled bold>{branch?.name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Hospital Specialty</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ specialty }) => (
                <CRTable.CRCellStyled bold>{specialty?.name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Hospital User</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ user }) => (
                <CRTable.CRCellStyled bold>{user?.name}</CRTable.CRCellStyled>
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

ListHospitals.defaultProps = {
  hospitals: [],
};

export default ListHospitals;
