import React, { useState, memo, useMemo, useCallback } from 'react';
import { FlexboxGrid } from 'rsuite';
import { CRSelectInput, CRButton } from 'components';
import ListSelectionItems from '../../permissions/list-selections-items/index';
import { ALL_CHOICE } from 'utils/constants';

const initValue = {
  branchId: null,
};

const AddBranchPermissions = ({ branches, rules, onAdd, onDelete }) => {
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
    () =>
      rules.map(({ branchId }) => `${branchesNames[branchId] || ALL_CHOICE}`),
    [branchesNames, rules]
  );

  const handelChange = useCallback(
    branchId => setFormValue({ ...formValue, branchId }),
    [formValue]
  );

  const branchChoices = useMemo(
    () =>
      rules.length > 0
        ? branches
        : [{ id: ALL_CHOICE, name: ALL_CHOICE }, ...branches],
    [branches, rules.length]
  );
  const selectedAll = useMemo(
    () => rules.some(({ branchId }) => branchId === ALL_CHOICE),
    [rules]
  );

  return (
    <FlexboxGrid align="middle" justify="space-between">
      <FlexboxGrid.Item colspan={9}>
        <CRSelectInput
          placeholder="Select Branch"
          block
          name="branchId"
          value={formValue.branchId}
          onChange={handelChange}
          disabled={selectedAll}
          data={branchChoices}
        />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={9}></FlexboxGrid.Item>
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

export default memo(AddBranchPermissions);
