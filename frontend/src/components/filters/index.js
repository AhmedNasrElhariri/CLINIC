import React, { useState } from 'react';
import { filterAppointments } from './filters';
import { Div } from 'components';
import Filter from './filter';

export default function AppointmentFilters({
  appointments,
  type,
  method,
  branches,
  render,
  todayApp = false,
  notAllowSpecialty,
  notAllowUser,
}) {
  const [state, setState] = useState({
    specialty: null,
    branch: null,
    doctor: null,
  });

  const filteredAppointments = filterAppointments(appointments, state);
  let totalRevenues = 0;
  let totalExpenses = 0;
  if (type === 'accounting') {
    if (method === 'revenues') {
      totalRevenues = filteredAppointments?.reduce(
        (acc, e) => acc + e?.amount,
        0
      );
    } else {
      totalExpenses = filteredAppointments?.reduce(
        (acc, e) => acc + e?.amount,
        0
      );
    }
  }
  if (type === 'sales') {
    totalRevenues = filteredAppointments?.reduce(
      (acc, e) => acc + e?.totalPrice,
      0
    );
    totalExpenses = filteredAppointments?.reduce(
      (acc, e) => acc + e?.totalCost,
      0
    );
  }

  return (
    <Div mb={10}>
      <Filter
        formValue={state}
        onChange={setState}
        branches={branches}
        todayApp={todayApp}
        notAllowSpecialty={notAllowSpecialty}
        notAllowUser={notAllowUser}
      />
      {render(filteredAppointments, totalRevenues, totalExpenses)}
    </Div>
  );
}
