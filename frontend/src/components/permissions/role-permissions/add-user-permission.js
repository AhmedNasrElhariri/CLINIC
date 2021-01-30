import React, { useState, memo, useMemo, useCallback } from 'react';
import * as R from 'ramda';
import { FlexboxGrid } from 'rsuite';

import { CRSelectInput, CRButton } from 'components';
import ListSelectionItems from '../../permissions/list-selections-items/index';

const AddUserPermissions = ({ branches, rules, onAdd, onDelete }) => {
  const [formValue, setFormValue] = useState({
    branchId: null,
    userId: null,
  });

  const add = useCallback(() => {
    onAdd(formValue);
  }, [formValue, onAdd]);

  const users = useMemo(
    () =>
      R.pipe(
        R.map(R.prop('specialties')),
        R.flatten,
        R.map(R.prop('users')),
        R.flatten
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
          data={branches}
          value={formValue.branchId}
          onChange={updateFormField('branchId')}
        />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={9}>
        <CRSelectInput
          placeholder="Select User"
          block
          cleanable={false}
          searchable={false}
          labelKey="name"
          valueKey="id"
          name="userId"
          data={users}
          value={formValue.userId}
          onChange={updateFormField('userId')}
        />
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={5}>
        <CRButton primary small onClick={add}>
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
