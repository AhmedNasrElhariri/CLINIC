export interface Speciality {
  id: string;
  name: string;
  doctors: Array<Doctor>;
}

export interface Doctor {
  id: string;
  name: string;
}

export interface RootStore {
  selectedBranch: string | null;
  selectedSpecialty: string | null;
  selectedDoctor: string | null;
}

export interface Branch {
  id: string;
  name: string;
  phoneNo?: string;
  specialties: Array<Speciality>;
}

export interface AuthStore {
  token: string | null;
  user?: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
  allowedViews: Array<string>;
  avatar: string;
  id: string;
  language: string;
  name: string;
  organizationId: string;
  position: string;
  role: {
    permissions: Array<string>;
  };
}
