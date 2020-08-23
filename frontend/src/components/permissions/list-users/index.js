import React from 'react';
import { useHistory } from 'react-router-dom';

import { MainContainer, CRTable } from 'components';

import useFetch from './fetch-data';

const ListUsers = () => {
  const history = useHistory();
  const { users } = useFetch();

  return (
    <>
      <MainContainer title="Permissions">
        <CRTable
          autoHeight
          data={users}
          onRowClick={({ id }) => {
            history.push(`/permissions/${id}`);
          }}
          bordered={false}
        >
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="name" bold />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Email</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="email" semiBold />
          </CRTable.CRColumn>
        </CRTable>
      </MainContainer>
    </>
  );
};

ListUsers.propTypes = {};

export default ListUsers;
