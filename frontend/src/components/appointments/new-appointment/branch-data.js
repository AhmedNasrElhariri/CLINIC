import { mapArrToChoices } from 'utils/misc';

export const branches = {
  branches: [
    {
      id: 1,
      name: 'cairo',
    },
    {
      id: 2,
      name: 'giza',
    },
    {
      id: 3,
      name: 'alex',
    },
  ],
  specializations: [
    {
      id: 1,
      name: 'bones',
      branch_id: 1,
    },
    {
      id: 2,
      name: 'surgery',
      branch_id: 1,
    },
    {
      id: 3,
      name: 'bones',
      branch_id: 2,
    },
    {
      id: 4,
      name: 'beauty',
      branch_id: 2,
    },
    {
      id: 5,
      name: 'child',
      branch_id: 3,
    },
  ],
  doctors: [
    {
      id: 1,
      name: 'khaled',
      specializations: [1, 3],
    },
    {
      id: 2,
      name: 'mohamed',
      specializations: [1],
    },
    {
      id: 3,
      name: 'ahmed',
      specializations: [2],
    },
    {
      id: 4,
      name: 'eslam',
      specializations: [2],
    },
    {
      id: 5,
      name: 'gamal',
      specializations: [4],
    },
    {
      id: 6,
      name: 'zizo',
      specializations: [4],
    },
    {
      id: 7,
      name: 'samy',
      specializations: [5],
    },
    {
      id: 8,
      name: 'omr',
      specializations: [5],
    },
  ],
};

export const branchesNames = branches.branches.map(branch => branch.name);
export const branchesTypes = mapArrToChoices(branchesNames);
export const getSpecializationsByBranchName = branchName => {
  const branch = branches.branches.find(branch => branch.name === branchName);
  if (!branch) {
    return [];
  }
  const branchId = branch.id;
  if (!branchId) {
    return [];
  }
  return branches.specializations
    .filter(specialization => specialization.branch_id === branchId)
    .map(specialization => specialization.name);
};
export const specializationsTypes = branchName =>
  mapArrToChoices(getSpecializationsByBranchName(branchName));

export const getDoctorsBySpecialization = specializationName => {
  const specialization = branches.specializations.find(
    specialization => specialization.name === specializationName
  );

  if (!specialization) {
    return [];
  }

  const specializationId = specialization.id;

  if (!specializationId) {
    return [];
  }
  const doctors = branches.doctors
    .filter(doctor =>
      doctor.specializations.some(item => item === specializationId)
    )
    .map(doctor => doctor.name);
  if (!doctors) {
    return [];
  }
  return doctors;
};

export const doctorsTypes = specializationName =>
  mapArrToChoices(getDoctorsBySpecialization(specializationName));
