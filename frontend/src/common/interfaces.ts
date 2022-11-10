export interface Speciality {
  id: string;
  name: string;
  doctors: Array<Doctor>;
}

export interface Doctor {
  id: string;
  name: string;
}
