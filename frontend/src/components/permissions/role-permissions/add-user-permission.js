import React, { useState, memo, useMemo, useCallback } from 'react';
import * as R from 'ramda';
import { FlexboxGrid } from 'rsuite';

import { CRSelectInput, CRButton } from 'components';
import ListSelectionItems from '../../permissions/list-selections-items/index';

const AddUserPermissions = ({ branches, mappings, onAdd, onDelete }) => {
  const [formValue, setFormValue] = useState({
    branchId: null,
    userId: null,
  });

  const add = useCallback(() => {
    onAdd(formValue);
  }, [formValue, onAdd]);

  const selectedBranch = useMemo(() => {
    return branches.find(p => p.id === formValue.branchId) || {};
  }, [formValue, branches]);

  const usersPermissions = useMemo(
    () => (selectedBranch.specialties || []).map(p => p.users),
    [selectedBranch.specialties]
  );
  const users = useMemo(() => R.flatten(usersPermissions), [usersPermissions]);

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
      mappings.map(
        ({ branchId, userId }) =>
          `${branchesNames[branchId]} - ${usersNames[userId]}`
      ),
    [branchesNames, mappings, usersNames]
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
          + Add New
        </CRButton>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={22}>
        <ListSelectionItems items={items} onDelete={onDelete} />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};
AddUserPermissions.defaultProps = {
  selectedItems: [],
};

export default memo(AddUserPermissions);
