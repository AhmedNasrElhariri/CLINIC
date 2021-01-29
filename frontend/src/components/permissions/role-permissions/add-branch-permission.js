import React, { useState, memo, useMemo, useCallback } from 'react';
import { FlexboxGrid } from 'rsuite';

import { CRSelectInput, CRButton, Div } from 'components';
import ListSelectionItems from '../../permissions/list-selections-items/index';

const initValue = {
  branchId: null,
};

const AddBranchPermissions = ({ branches, mappings, onAdd, onDelete }) => {
  const [formValue, setFormValue] = useState(initValue);

  const add = useCallback(() => {
    onAdd(formValue);
    setFormValue(initValue);
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

  const items = useMemo(
    () => mappings.map(({ branchId }) => `${branchesNames[branchId]}`),
    [branchesNames, mappings]
  );

  const handelChange = useCallback(
    branchId => setFormValue({ ...formValue, branchId }),
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
          onChange={handelChange}
          data={branches}
        />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={9}></FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={5}>
        <CRButton primary small onClick={add}>
          + Add New
        </CRButton>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={24}>
        <ListSelectionItems items={items} onDelete={onDelete} />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

AddBranchPermissions.defaultProps = {
  selectedItems: [],
};

export default memo(AddBranchPermissions);
