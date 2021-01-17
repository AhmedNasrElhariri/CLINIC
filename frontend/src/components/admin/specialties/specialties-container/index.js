import React, { useState, useCallback } from 'react';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  NewSpecialty,
  MainContainer,
  CRButton,
  ListSpecialties,
} from 'components';

export default function SpecialtiesContainer() {
  const [visible, setVisible] = useState(false);
  const data =
    JSON.parse(localStorage.getItem('specialtiesInBranch')) || [];

  const create = useCallback(
    specialty => {
      let specialties = [
        ...data,
        {
          id: Math.random().toString(36).substr(2, 9),
          name: specialty.name,
          permissions: [],
        },
      ];
      specialties = JSON.stringify(specialties);
      localStorage.setItem('specialties', specialties);
      Alert.success('Specialty has been created successfully');
      setVisible(false);
    },
    [data]
  );

  const showModal = useCallback(() => setVisible(true), []);
  const hideModal = useCallback(() => setVisible(false), []);
  const onCreate = useCallback(specialty => create(specialty), [
    create,
  ]);

  const specialties = R.propOr(
    [],
    'specialties'
  )({
    specialties: data,
  });

  return (
    <>
      <MainContainer
        title="Specialties"
        nobody
        more={
          <CRButton onClick={showModal} primary small>
            New Specialty
          </CRButton>
        }
      ></MainContainer>
      <NewSpecialty
        onCreate={onCreate}
        show={visible}
        onHide={hideModal}
        onCancel={hideModal}
      />
      <ListSpecialties specialties={specialties} />
    </>
  );
}

SpecialtiesContainer.propTypes = {};

SpecialtiesContainer.defaultProps = {};
