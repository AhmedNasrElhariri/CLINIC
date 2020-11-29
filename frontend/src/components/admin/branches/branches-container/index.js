import React, { useState, useCallback } from 'react';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  NewSpecialization,
  MainContainer,
  CRButton,
  ListSpecializations,
} from 'components';

export default function Specializations() {
  const [visible, setVisible] = useState(false);
  const data = JSON.parse(localStorage.getItem('specializations')) || [];

  const create = specialization => {
    let specializations = [
      ...data,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: specialization.name,
        permissions: [],
      },
    ];
    specializations = JSON.stringify(specializations);
    localStorage.setItem('specializations', specializations);
    Alert.success('Specialization has been created successfully');
    setVisible(false);
  };

  const showModal = useCallback(() => setVisible(true), []);
  const hideModal = useCallback(() => setVisible(false), []);
  const onCreate = useCallback(specialization => create(specialization), [
    create,
  ]);

  const specializations = R.propOr(
    [],
    'specializations'
  )({
    specializations: data,
  });

  return (
    <>
      <MainContainer
        title="Specializations"
        nobody
        more={
          <CRButton onClick={showModal} primary small>
            New Specialization
          </CRButton>
        }
      ></MainContainer>
      <NewSpecialization
        onCreate={onCreate}
        show={visible}
        onHide={hideModal}
        onCancel={hideModal}
      />
      <ListSpecializations specializations={specializations} />
    </>
  );
}

Specializations.propTypes = {};

Specializations.defaultProps = {};
