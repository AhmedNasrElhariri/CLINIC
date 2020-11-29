import React from 'react';
import { CRCard, CRTable } from 'components';
import { CheckboxGroup, Checkbox } from 'rsuite';

export default function ListSpecializations({ specializations }) {
  const handleChange = (value, event, checked) => {
    const specializationId = event.target.name;
    const permissions = value;

    let specializations =
      JSON.parse(localStorage.getItem('specializations')) || [];
    const specialization = specializations.find(
      specialization => specialization.id === specializationId
    );

    const editedSpecialization = { ...specialization, permissions };
    specializations = specializations.map(specialization =>
      specialization.id !== editedSpecialization.id
        ? specialization
        : editedSpecialization
    );

    specializations = JSON.stringify(specializations);
    localStorage.setItem('specializations', specializations);
  };

  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={specializations} bordered={false}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="name">
              {({ name }) => (
                <CRTable.CRCellStyled bold>{name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Permissions</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="permissions">
              {({ permissions, id }) => {
                return (
                  <CRTable.CRCellStyled>
                    <CheckboxGroup
                      inline
                      onChange={handleChange}
                      defaultValue={permissions}
                      name={id}
                    >
                      <Checkbox value={'list'}>List</Checkbox>
                      <Checkbox value={'view'}>View</Checkbox>
                      <Checkbox value={'create'}>Create</Checkbox>
                      <Checkbox value={'delete'}>Delete</Checkbox>
                    </CheckboxGroup>
                  </CRTable.CRCellStyled>
                );
              }}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}

ListSpecializations.propTypes = {};

ListSpecializations.defaultProps = {
  specializations: [],
};
