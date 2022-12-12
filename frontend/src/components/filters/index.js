import React, { memo, useEffect, useState, useCallback } from 'react';
import { filterAppointments } from './filters';
import { Div } from 'components';
import Filter from './filter';
import {
  selectSelectedBranch,
  selectSelectedSpecialty,
  selectSelectedDoctor,
  setSelectedSpecialty,
  setSelectedDoctor,
  setSelectedBranch,
} from 'features/root/rootSlice';
import { useAppDispatch, useAppSelector } from 'redux-store/hooks';
import {
  SELECTED_BRANCH,
  SELECTED_DOCTOR,
  SELECTED_SPECIALTY,
} from 'utils/constants';
export default function AppointmentFilters({
  appointments,
  type,
  method,
  branches,
  render,
  todayApp = false,
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
    <Div mb={4}>
      <Filter
        formValue={state}
        onChange={setState}
        branches={branches}
        todayApp={todayApp}
      />
      {render(filteredAppointments, totalRevenues, totalExpenses)}
    </Div>
  );
}
