import React, { useState, useCallback } from 'react';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  NewBranch,
  MainContainer,
  CRButton,
  ListBranches,
  AddSpecialty,
  AddDoctor,
} from 'components';

export default function Branches() {
  // Branch
  const [branchVisible, setBranchVisible] = useState(false);

  const data = JSON.parse(localStorage.getItem('branches')) || [];

  const createBranch = useCallback(
    branch => {
      let branches = [
        ...data,
        {
          id: Math.random().toString(36).substr(2, 9),
          name: branch.name,
          address: branch.address,
          phone: branch.phone,
          notes: branch.notes,
        },
      ];
      branches = JSON.stringify(branches);
      localStorage.setItem('branches', branches);
      Alert.success('Branch has been created successfully');
      setBranchVisible(false);
    },
    [data]
  );

  const showBranchModal = useCallback(() => setBranchVisible(true), []);
  const hideBranchModal = useCallback(() => setBranchVisible(false), []);

  const onCreateBranch = useCallback(branch => createBranch(branch), [
    createBranch,
  ]);

  const branches = R.propOr(
    [],
    'branches'
  )({
    branches: data,
  });

  // Specialty
  const [specialtyVisible, setSpecialtyVisible] = useState(false);
  const specialtiesInBranchData =
    JSON.parse(localStorage.getItem('specialtiesInBranch')) || [];

  const createSpecialty = useCallback(
    specialtiesInBranches => {
      let specialtiesInBranch = [
        ...specialtiesInBranchData,
        {
          id: Math.random().toString(36).substr(2, 9),
          branch: specialtiesInBranches.branch,
          specialties: [specialtiesInBranches.specialty],
        },
      ];
      specialtiesInBranch = JSON.stringify(specialtiesInBranch);
      localStorage.setItem('specialtiesInBranch', specialtiesInBranch);
      Alert.success('Specialty has been added to branch successfully');
      setSpecialtyVisible(false);
    },
    [specialtiesInBranchData]
  );

  const showSpecialtyModal = useCallback(
    () => setSpecialtyVisible(true),
    []
  );
  const hideSpecialtyModal = useCallback(
    () => setSpecialtyVisible(false),
    []
  );

  const onCreateSpecialty = useCallback(
    specialty => createSpecialty(specialty),
    [createSpecialty]
  );

  // Doctors
  const [doctorVisible, setDoctorVisible] = useState(false);

  const createDoctor = useCallback(doctors => {
    console.log(doctors);
    Alert.success('Doctor has been added to branch successfully');
    setDoctorVisible(false);
  }, []);

  const showDoctorModal = useCallback(() => setDoctorVisible(true), []);
  const hideDoctorModal = useCallback(() => setDoctorVisible(false), []);

  const onCreateDoctor = useCallback(doctor => createDoctor(doctor), [
    createDoctor,
  ]);

  return (
    <>
      <MainContainer
        title="branches"
        nobody
        more={
          <div>
            <CRButton
              onClick={showBranchModal}
              primary
              small
              style={{ margin: '0 10px' }}
            >
              New Branch
            </CRButton>
            <CRButton
              onClick={showSpecialtyModal}
              primary
              small
              style={{ margin: '0 10px' }}
            >
              Add Specialty
            </CRButton>
            <CRButton
              onClick={showDoctorModal}
              primary
              small
              style={{ margin: '0 10px' }}
            >
              Add Doctor
            </CRButton>
          </div>
        }
      ></MainContainer>
      <AddDoctor
        onCreate={onCreateDoctor}
        show={doctorVisible}
        onHide={hideDoctorModal}
        onCancel={hideDoctorModal}
        branches={branches}
      />
      <AddSpecialty
        onCreate={onCreateSpecialty}
        show={specialtyVisible}
        onHide={hideSpecialtyModal}
        onCancel={hideSpecialtyModal}
        branches={branches}
      />
      <NewBranch
        onCreate={onCreateBranch}
        show={branchVisible}
        onHide={hideBranchModal}
        onCancel={hideBranchModal}
      />
      <ListBranches branches={branches} />
    </>
  );
}

Branches.propTypes = {};

Branches.defaultProps = {};
