import React from 'react';
import { useLocation } from 'react-router';

export default function EmployeePayroll(props) {
  const location = useLocation();
  const { state: employee } = location;
  return (
    <>
      <h1>{employee.name}</h1>
      <pre>{JSON.stringify(employee)}</pre>
    </>
  );
}
