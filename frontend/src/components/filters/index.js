import React, { memo, useEffect, useState } from "react";
import { filterAppointments } from "./filters";
import { Div } from "components";
import Filter from "./filter";
import { useAppSelector } from "redux-store/hooks";
import { selectSelectedBranch } from "features/root/rootSlice";

export default function AppointmentFilters({
  appointments,
  type,
  method,
  branches,
  render,
}) {
  const selectedBranch = useAppSelector(selectSelectedBranch);
  const [state, setState] = useState({
    specialty: null,
    branch: null,
    doctor: null,
  });
  const filteredAppointments = filterAppointments(appointments, state);
  let totalRevenues = 0;
  let totalExpenses = 0;
  if (type === "accounting") {
    if (method === "revenues") {
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
  if (type === "sales") {
    totalRevenues = filteredAppointments?.reduce(
      (acc, e) => acc + e?.totalPrice,
      0
    );
    totalExpenses = filteredAppointments?.reduce(
      (acc, e) => acc + e?.totalCost,
      0
    );
  }

  useEffect(
    () => setState((prev) => ({ ...prev, branch: selectedBranch })),
    [selectedBranch]
  );

  return (
    <Div mb={4}>
      <Filter formValue={state} onChange={setState} branches={branches} />
      {render(filteredAppointments, totalRevenues, totalExpenses)}
    </Div>
  );
}
