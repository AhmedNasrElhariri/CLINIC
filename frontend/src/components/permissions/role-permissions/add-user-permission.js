import React, { useState, memo, useMemo, useCallback, useEffect } from 'react';
import * as R from 'ramda';
import { FlexboxGrid } from 'rsuite';

import { CRSelectInput, CRButton } from 'components';
import ListSelectionItems from '../../permissions/list-selections-items/index';
import { ALL_CHOICE } from 'utils/constants';

const AddUserPermissions = ({ branches, doctors, rules, onAdd, onDelete }) => {
  const [formValue, setFormValue] = useState({
    branchId: null,
    specialtyId: null,
    userId: null,
  });

  useEffect(() => {
    const doctor = doctors.find(d => d.id === formValue.userId);
    if (!doctor) {
      return;
    }
    setFormValue(f => ({ ...f, specialtyId: doctor.specialty.id }));
  }, [doctors, formValue.userId]);

  const add = useCallback(() => {
    onAdd(formValue);
  }, [formValue, onAdd]);

  const users = useMemo(
    () =>
      R.pipe(
        R.map(R.prop('specialties')),
        R.flatten,
        R.map(R.prop('doctors')),
        R.flatten,
        R.uniqBy(R.prop('id'))
      )(branches),
    [branches]
  );

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

  const usersNames = useMemo(
    () =>
      users.reduce(
        (obj, { id, name }) => ({
          ...obj,
          [id]: name,
        }),
        {}
      ),
    [users]
  );

  const items = useMemo(
    () =>
      rules.map(
        ({ branchId, userId }) =>
          `${branchesNames[branchId]} - ${usersNames[userId]}`
      ),
    [branchesNames, rules, usersNames]
  );

  const updateFormField = useCallback(
    fieldName => val => setFormValue({ ...formValue, [fieldName]: val }),
    [formValue]
  );

  const selectedAll = useMemo(
    () => rules.some(({ branchId }) => branchId === ALL_CHOICE),
    [rules]
  );

  const branchChoices = useMemo(() => {
    const userId = formValue.userId;
    if (!userId) {
      return [];
    }

    const specialtyId = doctors.find(d => d.id === userId)?.specialty?.id;

    const filteredBranches = branches.filter(b =>
      b.specialties.some(s => s.id === specialtyId)
    );

    return rules.length || !filteredBranches.length
      ? filteredBranches
      : [{ id: ALL_CHOICE, name: ALL_CHOICE }, ...filteredBranches];
  }, [branches, doctors, formValue.userId, rules.length]);

  return (
    <FlexboxGrid align="middle" justify="space-between">
      <FlexboxGrid.Item colspan={9}>
        <CRSelectInput
          placeholder="Select User"
          block
          cleanable={false}
          searchable={false}
          name="userId"
          data={doctors}
          value={formValue.userId}
          disabled={selectedAll}
          onChange={updateFormField('userId')}
        />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={9}>
        <CRSelectInput
          placeholder="Select Branch"
          block
          cleanable={false}
          searchable={false}
          name="branchId"
          data={branchChoices}
          value={formValue.branchId}
          disabled={selectedAll}
          onChange={updateFormField('branchId')}
        />
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={5}>
        <CRButton variant="primary" onClick={add} disabled={selectedAll}>
          + Add
        </CRButton>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={22}>
        <ListSelectionItems items={items} onDelete={onDelete} />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default memo(AddUserPermissions);
