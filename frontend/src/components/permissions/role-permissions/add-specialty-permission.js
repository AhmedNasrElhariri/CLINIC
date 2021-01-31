import React, { useState, memo, useMemo, useCallback } from 'react';
import { FlexboxGrid } from 'rsuite';
import * as R from 'ramda';

import { CRSelectInput, CRButton } from 'components';
import ListSelectionItems from '../list-selections-items/index';

const AddSpecialtyPermissions = ({ branches, rules, onAdd, onDelete }) => {
  const [formValue, setFormValue] = useState({
    branchId: [],
    specialtyId: null,
  });

  const add = useCallback(() => {
    onAdd(formValue);
  }, [formValue, onAdd]);

  const selectedBranch = useMemo(() => {
    let branchIds = formValue.branchId;
    return branches.find(p => p.id === branchIds) || {};
  }, [formValue, branches]);

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

  const specialtiesNames = useMemo(
    () =>
      R.flatten(branches.map(b => b.specialties)).reduce(
        (obj, { id, name }) => ({
          ...obj,
          [id]: name,
        })
      ),
    [branches]
  );

  const items = useMemo(
    () =>
      rules.map(
        ({ branchId, specialtyId }) =>
          `${branchesNames[branchId]} - ${specialtiesNames[specialtyId]}`
      ),
    [branchesNames, rules, specialtiesNames]
  );

  const updateFormField = useCallback(
    fieldName => val => setFormValue({ ...formValue, [fieldName]: val }),
    [formValue]
  );

  return (
    <FlexboxGrid align="middle" justify="space-between">
      <FlexboxGrid.Item colspan={9}>
        <CRSelectInput
          placeholder="Select Branch"
          block
          cleanable={false}
          searchable={false}
          labelKey="name"
          valueKey="id"
          name="branchId"
          value={formValue.branchId}
          onChange={updateFormField('branchId')}
          data={branches}
        />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={9}>
        <CRSelectInput
          placeholder="Select Specialty"
          block
          cleanable={false}
          searchable={false}
          labelKey="name"
          valueKey="id"
          name="specialtyId"
          value={formValue.specialtyId}
          onChange={updateFormField('specialtyId')}
          data={selectedBranch.specialties || []}
        />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={5}>
        <CRButton primary small onClick={add}>
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
