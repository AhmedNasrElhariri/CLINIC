import React, { useState, memo, useMemo, useCallback } from 'react';
import { FlexboxGrid } from 'rsuite';
import * as R from 'ramda';

import { CRSelectInput, CRButton } from 'components';
import ListSelectionItems from '../list-selections-items/index';
import { ALL_CHOICE } from 'utils/constants';
import { usePermissions } from 'hooks';

const AddSpecialtyPermissions = ({ rules, onAdd, onDelete }) => {
  const { branches } = usePermissions();
  const [formValue, setFormValue] = useState({
    branchId: null,
    specialtyId: null,
  });

  const add = useCallback(() => {
    onAdd(formValue);
  }, [formValue, onAdd]);

  const branchesNames = useMemo(
    () =>
      branches.reduce(
        (obj, { id, name }) => ({
          ...obj,
          [id]: name,
        }),
        {}
      ),
    [branches]
  );
  const specialties = useMemo(() => {
    return (
      R.pipe(
        R.map(R.prop('specialties')),
        R.flatten,
        R.uniqBy(R.prop('id'))
      )(branches) || []
    );
  }, [branches]);
  const specialtiesNames = useMemo(
    () =>
      specialties.reduce(
        (obj, { id, name }) => ({
          ...obj,
          [id]: name,
        }),
        {}
      ),
    [specialties]
  );
  console.log(
    specialtiesNames,
    'specialtiesNames,specialtiesNames',
    branches,
    'branches,branches'
  );
  const items = useMemo(
    () =>
      rules.map(
        ({ branchId, specialtyId }) =>
          `${specialtiesNames[specialtyId]} - ${branchesNames[branchId] || ''}`
      ),
    [branchesNames, rules, specialtiesNames]
  );

  const selectedAll = useMemo(
    () => rules.some(({ branchId }) => branchId === ALL_CHOICE),
    [rules]
  );

  const updateFormField = useCallback(
    fieldName => val => setFormValue({ ...formValue, [fieldName]: val }),
    [formValue]
  );

  const branchChoices = useMemo(() => {
    const specialtyId = formValue.specialtyId;
    const filteredBranches = branches.filter(b =>
      b.specialties.some(s => s.id === specialtyId)
    );
    return rules.length
      ? filteredBranches
      : [{ id: ALL_CHOICE, name: ALL_CHOICE }, ...filteredBranches];
  }, [branches, formValue.specialtyId, rules.length]);

  console.log(items, 'ISISIEMMMS');
  return (
    <FlexboxGrid align="middle" justify="space-between">
      <FlexboxGrid.Item colspan={9}>
        <CRSelectInput
          placeholder="Select Specialty"
          block
          name="specialtyId"
          value={formValue.specialtyId}
          disabled={selectedAll}
          onChange={updateFormField('specialtyId')}
          data={specialties || []}
        />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={9}>
        <CRSelectInput
          placeholder="Select Branch"
          block
          name="branchId"
          value={formValue.branchId}
          onChange={updateFormField('branchId')}
          disabled={selectedAll}
          data={branchChoices}
        />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={5}>
        <CRButton variant="primary" onClick={add} disabled={selectedAll}>
          + Add
        </CRButton>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={24}>
        <ListSelectionItems items={items} onDelete={onDelete} />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default memo(AddSpecialtyPermissions);
