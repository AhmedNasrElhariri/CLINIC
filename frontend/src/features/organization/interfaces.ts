import { Speciality } from "common/interfaces";

export interface IOrganization {
  selectedBranch?: string;
}

export interface Branch {
  id: string;
  name: string;
  phoneNo?: string;
  specialties: Array<Speciality>;
}
