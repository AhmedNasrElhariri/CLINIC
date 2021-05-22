import React from 'react';
import { useHistory } from 'react-router-dom';
import { Icon } from 'rsuite';

import { CRCard, CRTable } from 'components';

export default function EmployeesPayroll({ payrollUsers, handleDelete }) {
  const history = useHistory();
  return (
    <>
      <CRCard borderless>
        <CRTable
          autoHeight
          data={payrollUsers}
          bordered={false}
          onRowClick={user => {
            history.push(`/payroll/${user.id}`, user);
          }}
        >
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>User Name</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ name }) => (
                <CRTable.CRCellStyled bold>{name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>

          {/* <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Position</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ user }) => (
                <CRTable.CRCellStyled bold>
                  {user.position}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn> */}

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Salary</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ salary }) => (
                <CRTable.CRCellStyled bold>{salary}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ id }) => (
                <>
                  <Icon
                    onClick={(...data) => {
                      console.dir(data);
                    }}
                    style={{ paddingRight: '25px' }}
                  >
                    Open Details
                  </Icon>
                  <Icon
                    onClick={e => {
                      e.stopPropagation();
                      handleDelete(id);
                    }}
                    icon="trash"
                  >
                    Delete
                  </Icon>
                </>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}

EmployeesPayroll.propTypes = {};
