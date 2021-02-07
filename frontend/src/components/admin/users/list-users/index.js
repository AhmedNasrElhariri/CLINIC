import React from 'react';
import { CRCard, CRTable } from 'components';
import { CheckboxGroup, Checkbox } from 'rsuite';

export default function Users({ users }) {
  const handleChange = (value, event, checked) => {
    const userId = event.target.name;
    const permissions = value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.id === userId);

    const editedUser = { ...user, permissions };
    users = users.map(user => (user.id !== editedUser.id ? user : editedUser));

    users = JSON.stringify(users);
    localStorage.setItem('users', users);
  };

  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={users} bordered={false}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="name">
              {({ name }) => (
                <CRTable.CRCellStyled bold>{name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Type</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="type">
              {({ type }) => (
                <CRTable.CRCellStyled bold>{type}</CRTable.CRCellStyled>
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

Users.propTypes = {};

Users.defaultProps = {
  users: [],
};
