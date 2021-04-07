import React from 'react';
import { useHistory } from 'react-router-dom';
import { Icon } from 'rsuite';

import { CRCard, CRTable } from 'components';

export default function EmployeesPayroll({ users }) {
  const history = useHistory();
  return (
    <>
      <CRCard borderless>
        <CRTable
          autoHeight
          data={users}
          bordered={false}
          onRowClick={employee => {
            history.push(`/payroll/${employee.id}`, employee);
          }}
        >
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="name" bold />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Position</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="position" />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Net Salary</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="salary" />
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {() => (
                <Icon
                  onClick={(...data) => {
                    console.dir(data);
                  }}
                >
                  Open Details
                </Icon>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}

EmployeesPayroll.propTypes = {};

EmployeesPayroll.defaultProps = {
  users: [
    {
      id: 'a2a16128ebec',
      name: 'islam',
      position: 'engineer',
      salary: '25000',
    },
    { id: 'e1c9d53d', name: 'ahmed', position: 'doctor', salary: '3000' },
    { id: 'b77052bb878', name: 'maya', position: 'assistant', salary: '15000' },
  ],
};
