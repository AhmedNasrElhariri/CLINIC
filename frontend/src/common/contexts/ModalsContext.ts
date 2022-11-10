import { createContext } from "react";

export const ModalsContext = createContext({
  toggleAddAppointment: () => {},
  toggleAddPatient: () => {},
});
