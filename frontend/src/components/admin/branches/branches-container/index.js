import React, { useState, useCallback } from 'react';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import { NewBranch, MainContainer, CRButton, ListBranches } from 'components';

export default function Branches() {
  const [visible, setVisible] = useState(false);
  const data = JSON.parse(localStorage.getItem('branches')) || [];

  const create = branch => {
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
    setVisible(false);
  };

  const showModal = useCallback(() => setVisible(true), []);
  const hideModal = useCallback(() => setVisible(false), []);
  const onCreate = useCallback(branch => create(branch), [create]);

  const branches = R.propOr(
    [],
    'branches'
  )({
    branches: data,
  });

  return (
    <>
      <MainContainer
        title="branches"
        nobody
        more={
          <CRButton onClick={showModal} primary small>
            New Branch
          </CRButton>
        }
      ></MainContainer>
      <NewBranch
        onCreate={onCreate}
        show={visible}
        onHide={hideModal}
        onCancel={hideModal}
      />
      {/* <ListBranches branches={branches} /> */}
    </>
  );
}

Branches.propTypes = {};

Branches.defaultProps = {};
