import React, { useState, useCallback } from 'react';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  NewBranch,
  MainContainer,
  CRButton,
  ListBranches,
  AddSpecialization,
} from 'components';

export default function Branches() {
  // Branch
  const [branchVisible, setBranchVisible] = useState(false);

  const data = JSON.parse(localStorage.getItem('branches')) || [];

  const createBranch = branch => {
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
  };

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

  // Specialization
  const [specializationVisible, setSpecializationVisible] = useState(false);
  const specializationsInBranchData =
    JSON.parse(localStorage.getItem('specializationsInBranch')) || [];

  const createSpecialization = specializationsInBranches => {
    let specializationsInBranch = [
      ...specializationsInBranchData,
      {
        id: Math.random().toString(36).substr(2, 9),
        branch: specializationsInBranches.branch,
        specializations: [specializationsInBranches.specialization],
      },
    ];
    specializationsInBranch = JSON.stringify(specializationsInBranch);
    localStorage.setItem('specializationsInBranch', specializationsInBranch);
    Alert.success('Specialization has been added to branch successfully');
    setSpecializationVisible(false);
  };

  const showSpecializationModal = useCallback(
    () => setSpecializationVisible(true),
    []
  );
  const hideSpecializationModal = useCallback(
    () => setSpecializationVisible(false),
    []
  );

  const onCreateSpecialization = useCallback(
    specialization => createSpecialization(specialization),
    [createSpecialization]
  );

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
              onClick={showSpecializationModal}
              primary
              small
              style={{ margin: '0 10px' }}
            >
              Add Specialization
            </CRButton>
          </div>
        }
      ></MainContainer>
      <AddSpecialization
        onCreate={onCreateSpecialization}
        show={specializationVisible}
        onHide={hideSpecializationModal}
        onCancel={hideSpecializationModal}
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
