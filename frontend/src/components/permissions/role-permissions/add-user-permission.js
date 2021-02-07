import React, { useState, memo, useMemo, useCallback } from 'react';
import * as R from 'ramda';

import { Form, FlexboxGrid } from 'rsuite';
import { CRSelectInput, CRButton } from 'components';
import ListSelectionItems from '../../permissions/list-selections-items/index';

const AddUserPermissions = ({ branches, selectedItems, onAdd, onDelete }) => {
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

  const usersPermissions = (selectedBranch.specialties || []).map(p => p.users);
  const users = R.flatten(usersPermissions);

  const branchesNames = branches.reduce(
    (obj, { id, name }) => ({
      ...obj,
      [id]: name,
    }),
    {}
  );
  const usersNames = users.reduce(
    (obj, { id, name }) => ({
      ...obj,
      [id]: name,
    }),
    {}
  );
  const items = selectedItems.map(
    ({ branchId, userId }) =>
      `${branchesNames[branchId]} - ${usersNames[userId]}`
  );
  return (
    <Form formValue={formValue} onChange={setFormValue}>
      <FlexboxGrid.Item colspan={20}>
        <FlexboxGrid align="middle" justify="space-between">
          <FlexboxGrid.Item colspan={6}>
            <CRSelectInput
              placeholder="Select Branch"
              block
              cleanable={false}
              searchable={false}
              labelKey="name"
              valueKey="id"
              name="branchId"
              data={branches}
            />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={6}>
            {' '}
            <CRSelectInput
              placeholder="Select User"
              block
              cleanable={false}
              searchable={false}
              labelKey="name"
              valueKey="id"
              name="userId"
              data={users}
            />
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={6}>
            {' '}
            <CRButton primary small onClick={add}>
              + Add New
            </CRButton>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={22}>
            {' '}
            <ListSelectionItems items={items} onDelete={onDelete} />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </FlexboxGrid.Item>
    </Form>
  );
};
AddUserPermissions.defaultProps = {
  selectedItems: [],
};

export default memo(AddUserPermissions);
